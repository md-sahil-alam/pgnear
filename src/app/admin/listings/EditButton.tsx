export default function EditButton({ id }: { id: string }) {
  return (
    <a
      href={`/admin/listings/edit/${id}`}
      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
      Edit
    </a>
  );
}
