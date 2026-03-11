export function formatName(name: string) {
  if (!name) return "";

  return (
    name
      // ubah underscore atau dash jadi spasi
      .replace(/[_-]/g, " ")
      // pisahkan huruf kapital (camelCase)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // ubah semua jadi lowercase dulu
      .toLowerCase()
      // kapitalisasi setiap kata
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim()
  );
}
