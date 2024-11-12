export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    try {
        const orders = await prisma.order.findMany({
            where: {
                creatorId: id
            }
        });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}