# What does protect middlewear do?

Basically protect middleware checks whether the request belongs to a logged-in user. First it checks if he is authenticated or not, the way it checks is if the user is authenticated, the token is sent in the request header, then retrives the token and checks if the token is valid or not using jew.verify(). If the token is missing or invalid, it returns 401.. 

Once it knows that the token is valid, it reads the user id from the token payload, uses that id to fetch the current user from the database. Basically token is divided into 3 parts and one of the part is payload which has the id of the user. So, in the protect middlewear, it fetches the user details and attaches it to the request object