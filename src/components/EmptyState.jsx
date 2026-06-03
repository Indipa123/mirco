export default function EmptyState({ title = "No results found", description = "Try changing your search or filters." }) {
  return (
    <div className="empty-state wide">
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
