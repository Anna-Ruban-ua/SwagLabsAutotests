export async function checkSorting(data, sortOrder) {
    const sortedData = [...data].sort(sortOrder);
    expect(data).toEqual(sortedData);
}