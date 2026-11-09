import { describe, expect, it } from "vitest";
import { whatsappLink } from "@/lib/whatsapp";

describe("WhatsApp link", () => {
  it("opens a chat with 656 459 0112 using Mexico's country code", () => {
    expect(whatsappLink("hola")).toBe("https://wa.me/526564590112?text=hola");
  });
});
