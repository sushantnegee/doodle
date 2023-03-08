export const getSender=(loggedUser,users)=>{
    console.log(" =>",users,"logged User =>",loggedUser);
    return users[0]?._id===loggedUser?._id?users[1].name : users[0].name;
    
}