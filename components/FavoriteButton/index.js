import FavoriteIcon from "../../assets/icons/leaf.svg";

export default function FavoriteButton({ isFavorite, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFavorite ? "unlike" : "like"}
    >
      <FavoriteIcon width={28} height={28} />
    </button>
  );
}
