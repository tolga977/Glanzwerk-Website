import { describe, expect, it } from "vitest";
import { clientIp, createRateLimiter } from "@/lib/rateLimit";

describe("createRateLimiter", () => {
  it("erlaubt bis zum Limit und sperrt danach", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 10).allowed).toBe(true);
    expect(limiter.check("a", 20).allowed).toBe(true);
    const blocked = limiter.check("a", 30);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
  });

  it("zählt jeden Schlüssel getrennt", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("b", 0).allowed).toBe(true);
    expect(limiter.check("a", 1).allowed).toBe(false);
  });

  it("gibt nach Ablauf des Fensters wieder frei", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 999).allowed).toBe(false);
    expect(limiter.check("a", 1000).allowed).toBe(true);
  });

  it("zählt gesperrte Versuche nicht mit", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    limiter.check("a", 0);
    for (let t = 1; t < 500; t += 50) limiter.check("a", t);
    expect(limiter.check("a", 1000).allowed).toBe(true);
  });

  it("nennt die Wartezeit bis zum Ende des Fensters in Sekunden", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 600_000 });
    limiter.check("a", 0);
    expect(limiter.check("a", 60_000).retryAfterSeconds).toBe(540);
  });
});

describe("clientIp", () => {
  const req = (headers: Record<string, string>) => new Request("http://localhost/", { headers });

  it("nimmt den ersten Eintrag aus x-forwarded-for", () => {
    expect(clientIp(req({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" }))).toBe("203.0.113.5");
  });

  it("fällt auf x-real-ip zurück", () => {
    expect(clientIp(req({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("gibt null zurück, wenn keine IP bekannt ist", () => {
    expect(clientIp(req({}))).toBeNull();
  });
});
