export function deleteAddress(addresses, id){
    const parsedId = parseInt(id, 10);
    const fileteredAddresses = addresses.filter(addresses => addresses.id !== parsedId);
    return fileteredAddresses;
}