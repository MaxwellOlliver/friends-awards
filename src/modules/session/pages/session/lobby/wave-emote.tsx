import HandSvg from "@/assets/images/hand.svg";

export const WaveEmote = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-hand-wave-animation"
        style={{ transformOrigin: "bottom center" }}
      >
        <img src={HandSvg} alt="Wave emote" className="w-5 h-5" />
      </div>
    </div>
  );
};
