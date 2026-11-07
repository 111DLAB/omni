export async function onRequest(context) {
  // In a real app, you would validate payment tokens or sessions here.
  
  // Fetch the static file from the deployment asset pool
  const url = new URL(context.request.url);
  const fileUrl = `${url.origin}/Computer.phx`;
  
  const fileResponse = await fetch(fileUrl);
  
  if (!fileResponse.ok) {
    return new Response("File not found", { status: 404 });
  }

  // Get the file content
  const fileBuffer = await fileResponse.arrayBuffer();

  // Return the file with headers that force a browser download
  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=\"Computer.phx\"",
    },
  });
}
