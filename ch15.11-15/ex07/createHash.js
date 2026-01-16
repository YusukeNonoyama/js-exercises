import crypto from "crypto";

export function sha256Base64(text) {
  return crypto.createHash("sha256").update(text, "utf8").digest("base64");
}

const script = 'alert("RICOH")';
console.log(sha256Base64(script));

// ZGKMbT3NegX077yZeKmChVXljdKkjnessl0/j4RVvtA=
