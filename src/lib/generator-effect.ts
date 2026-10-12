import type { EffectDefinition, EffectScene } from "@/lib/effects";

/** Slim, prompt-free shape passed to the client generator. */
export type GeneratorEffect = {
  slug: string;
  name: string;
  subjects: 1 | 2;
  durationSec: number;
  scene: EffectScene;
  accent: string;
  accent2: string;
  templates: { id: string; name: string; blurb: string }[];
};

export function toGeneratorEffect(effect: EffectDefinition): GeneratorEffect {
  return {
    slug: effect.slug,
    name: effect.name,
    subjects: effect.subjects,
    durationSec: effect.durationSec,
    scene: effect.scene,
    accent: effect.accent,
    accent2: effect.accent2,
    templates: effect.templates.map(({ id, name, blurb }) => ({ id, name, blurb })),
  };
}
