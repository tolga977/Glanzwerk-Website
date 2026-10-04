/**
 * Einfacher Gleitfenster-Zähler je Schlüssel (hier: IP-Adresse).
 *
 * Der Speicher liegt im Prozess. Auf Vercel laufen mehrere Instanzen ohne
 * gemeinsamen Speicher, ein Zähler greift daher nur innerhalb einer Instanz —
 * das bremst einfache Fluten, ersetzt aber keine Firewall-Regel.
 */

export interface RateLimitVerdict {
  allowed: boolean;
  retryAfterSeconds: number;
}

export interface RateLimiter {
  check(key: string, now?: number): RateLimitVerdict;
}

const PRUNE_THRESHOLD = 5000;

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }): RateLimiter {
  const hitsByKey = new Map<string, number[]>();

  function prune(now: number) {
    for (const [key, hits] of hitsByKey) {
      if (hits.length === 0 || now - hits[hits.length - 1] >= windowMs) hitsByKey.delete(key);
    }
  }

  return {
    check(key, now = Date.now()) {
      if (hitsByKey.size > PRUNE_THRESHOLD) prune(now);

      const hits = (hitsByKey.get(key) ?? []).filter((time) => now - time < windowMs);
      if (hits.length >= limit) {
        hitsByKey.set(key, hits);
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)) };
      }

      hits.push(now);
      hitsByKey.set(key, hits);
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}

/**
 * IP des Besuchers aus den Proxy-Headern. Vercel setzt `x-forwarded-for`
 * selbst; der erste Eintrag ist die Besucher-IP. Fehlt sie, gibt die Funktion
 * `null` zurück — der Aufrufer begrenzt dann nicht, statt alle Besucher in
 * einem gemeinsamen Zähler zu sperren.
 */
export function clientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return request.headers.get("x-real-ip")?.trim() || null;
}
