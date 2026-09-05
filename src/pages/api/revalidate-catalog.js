function isAllowedPath(path) {
  return (
    path === "/" ||
    path === "/shop" ||
    path === "/collections" ||
    path.startsWith("/products/") ||
    path.startsWith("/collections/")
  );
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Method not allowed" });
  }

  if (
    !process.env.REVALIDATION_SECRET ||
    request.headers.authorization !== `Bearer ${process.env.REVALIDATION_SECRET}`
  ) {
    return response.status(401).json({ message: "Invalid revalidation secret" });
  }

  const requestedPaths = Array.isArray(request.body?.paths)
    ? request.body.paths
    : ["/", "/shop", "/collections"];
  const paths = [...new Set(requestedPaths)].filter(
    (path) => typeof path === "string" && isAllowedPath(path),
  );

  if (paths.length === 0) {
    return response.status(400).json({ message: "No valid catalog paths supplied" });
  }

  try {
    await Promise.all(paths.map((path) => response.revalidate(path)));
    return response.status(200).json({ revalidated: true, paths });
  } catch (error) {
    console.error("Catalog revalidation failed.", error);
    return response.status(500).json({ message: "Revalidation failed" });
  }
}
