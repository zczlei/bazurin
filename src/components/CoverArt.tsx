import type { EffectScene } from "@/lib/effects";

/** Original scene stills, composed for the 4:5 card. Subjects stay centered so a 9:16 crop still reads. */
const COVERS: Record<EffectScene, string> = {
  booth: "/covers/booth.jpg",
  redroom: "/covers/redroom.jpg",
  party: "/covers/party.jpg",
  rain: "/covers/rain.jpg",
  zombie: "/covers/zombie.jpg",
  pet: "/covers/pet.jpg",
};

export function CoverArt({
  scene,
  uid,
  className = "",
  children,
}: {
  scene: EffectScene;
  uid: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`cover ${className}`} data-cover={uid}>
      <img src={COVERS[scene]} alt="" />
      {children}
    </div>
  );
}
