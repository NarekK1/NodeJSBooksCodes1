export function saveAddress(addresses, address){
    // Check if the address has an ID to determine if it's an update or a new entry
    if(address.id){
        const index = addresses.findIndex(adr => adr.id === parseInt(address.id, 10));
         address.id = parseInt(address.id, 10);
         addresses[index] = address;
    }
    // If no ID is provided, it's a new address
    else{
        const nextId = Math.max(...addresses.map(address => address.id )) + 1;
        address.id = nextId;
        addresses.push(address);
    }
    return addresses;
}