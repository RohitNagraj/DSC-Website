var config = {
    apiKey: "AIzaSyCkk06vgohpPCH8mewLA-nlBgX13XkLPVE",
    authDomain: "dscwebsite-55259.firebaseapp.com",
    databaseURL: "https://dscwebsite-55259.firebaseio.com",
    projectId: "dscwebsite-55259",
    storageBucket: "dscwebsite-55259.appspot.com",
    messagingSenderId: "84754252191"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var ref = database.ref('blog_data');

function submitData(){
   //Defining all the id's for the elements
var title = document.getElementById('title');
var description = document.getElementById('exampleFormControlTextarea1');
var image = document.getElementById('exampleFormControlFile1');
var additional_file = document.getElementById('exampleFormControlFile1');

//Getting the value for all
var titleBlog = title.value;
var descriptionBlog = description.value;
var imageBlog = image.value;
var additionalFileBlog = additional_file.value;

//Looking at the values in the console.
console.log(titleBlog);
console.log(descriptionBlog);
console.log(imageBlog);
console.log(additionalFileBlog); 

ref.push(titleBlog);
ref.push(descriptionBlog);
ref.push(imageBlog);
ref.push(additionalFileBlog);
}
