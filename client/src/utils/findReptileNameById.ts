export const findReptileNameById = (id: number, reptiles: Reptile[]) => {
    const reptile = reptiles.find((reptile) => reptile.id === id)
    return reptile?.name
}
