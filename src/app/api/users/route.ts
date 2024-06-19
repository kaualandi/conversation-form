export async function POST(request: Request) {
  const { response, email } = await request.json();
  return Response.json(response);
}
