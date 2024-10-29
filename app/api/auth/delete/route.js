export async function DELETE(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
      try {
    let result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    result = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}