export function getForm(addresses, id){
    let address = {
        id: '',
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        country: '',
    };
    // If an ID is provided, find the address with that ID
    if(id){
        address = address.find((adr) => adr.id === parseInt(id, 10));
    }
     const form = `<!DOCTYPE html>
     <html>
     <head>
     <title>Adress book</title>
     <meta charset="utf-8">
     </head>
     <body>
     <form action = "/save" method="post" enctype="multipart/form-data">
     <div>
 <label for="upload">file</label>
 <input type="file" id="upload" name="upload" />
 </div>
     <imput type="hidden" id="id" name="id" value="${address.id }"/>
     <div>
     <label for="firstname">First Name</label>
     <input type="text" id="firstname" name="firsname" value="${address.firstname}"/>
     </div>
     <div>
     <label for="lastname">Last Name</label>
     <text type="text" id="lastname" name="lastname" value="${address.lastname}"/>
     </div>
     <div>
     <label for="street">Street</label>
     <input type="text" id="street" name="street" value="${address.street}"/>
     </div>
     <div>
     <label for="city">City</label>
     <input type="text" id="city" name="city" value="${address.city}"/>
     </div>
     <div>
     <label for="country">Country</label>
     <input type="text" id="country" name="country" value="${address.country}"/>
     </div>
     <div>
     <button type="submit">Save</button>
     </div>
     </form>
     </body>
     </html>`;
     return form;   

}