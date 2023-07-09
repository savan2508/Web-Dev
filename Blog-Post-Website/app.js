//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const homeStartingContent = "Welcome to my blog post page! Here, I aim to showcase my extensive knowledge of full-stack web development. This website has been meticulously crafted using a combination of EJS templating, CSS, and Bootstrap to ensure an appealing and user-friendly design. Powering the backend is the robust duo of Node.js and Express, providing seamless functionality and interactivity. Join me on this journey as I share insights, tutorials, and my passion for creating exceptional web experiences. Let's dive into the world of full-stack web development together!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render('home', {homeStartingContent: homeStartingContent, postLog: postLog});
});

app.get("/about", function(req, res){
  res.render('about');
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  postLog.forEach(function(post){
    let storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      const pageTitle = post.title;
      const postContent = post.content;
      res.render("post", {pageTitle: pageTitle, postContent: postContent});
    }
  })
});

app.post("/compose", function(req, res){
  let composePostTitle = req.body.postTitle;
  let composePostBody = req.body.postBody;
  const post = {
    title: composePostTitle,
    content: composePostBody
  };
  res.redirect('/');
  postLog.push(post);
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

let postLog = [
  {
    title: "The Power of Data Science in Decision Making",
    content: `Data science has revolutionized decision-making processes across various industries. In this blog post, we will explore the power of data science and how it helps organizations make informed and strategic choices.

            Understanding Data Science:
            Data science involves extracting insights from structured and unstructured data using a combination of statistical analysis, machine learning, and data visualization techniques. By harnessing the power of data, businesses can gain a competitive edge and make data-driven decisions.
    
            Applications of Data Science:
            Data science finds applications in numerous domains, including finance, healthcare, marketing, and more. For instance, in finance, data science helps in risk assessment and fraud detection. In healthcare, it aids in disease prediction and personalized medicine. The potential applications are vast and ever-expanding.
    
            The Data Science Process:
            Data science follows a structured process that includes data collection, data cleaning and preprocessing, exploratory data analysis, modeling, evaluation, and deployment. Each step plays a crucial role in deriving meaningful insights from data and building predictive models.
    
            Benefits of Data Science:
            Implementing data science techniques can lead to several benefits. It enables organizations to uncover hidden patterns and trends, optimize processes, improve customer experience, and enhance decision-making accuracy. By leveraging data science, businesses can gain valuable insights that drive growth and success.
            
            Conclusion:
            Data science is a game-changer in today's data-driven world. It empowers organizations to make informed decisions, gain a competitive edge, and unlock new opportunities. By harnessing the power of data science, businesses can pave the way for innovation and growth.
            
            Disclaimer: This blog post is written by an AI for example purposes and to showcase the website's working.`
  },
  {
    title: "The Evolution of Web Development: Trends and Technologies",
    content: `Web development has come a long way since its inception. In this blog post, we will explore the evolution of web development, highlighting key trends and technologies that have shaped the modern web.

              From Static to Dynamic Websites:
              Web development initially involved creating static HTML pages. However, with the advent of technologies like JavaScript and server-side scripting, web pages became dynamic, enabling real-time interactions and personalized user experiences.
              
              Responsive Web Design:
              The rise of mobile devices led to the need for responsive web design. Responsive websites adapt to different screen sizes, ensuring optimal user experience across devices. This approach became crucial as mobile usage surged, and users expected seamless browsing on smartphones and tablets.
              
              Introduction to Frameworks:
              Web development frameworks, such as Angular, React, and Vue.js, gained popularity due to their ability to streamline the development process. These frameworks provide reusable components, efficient state management, and enhanced performance, making web development more efficient and scalable.
              
              The Rise of APIs:
              Application Programming Interfaces (APIs) revolutionized web development by enabling seamless integration of different systems and services. APIs allow developers to access data and functionality from external sources, facilitating the development of robust and interconnected web applications.
              
              The Emergence of Single-Page Applications (SPAs):
              Single-page applications have gained prominence for their ability to provide a seamless user experience without page reloads. SPAs utilize JavaScript frameworks to render content dynamically, resulting in faster load times and smoother interactions.
              
              The Shift to Progressive Web Apps (PWAs):
              Progressive Web Apps combine the best features of web and mobile applications. They offer app-like experiences, offline functionality, and push notifications while remaining accessible through a web browser. PWAs provide an engaging user experience and have gained traction across industries.
              
              Conclusion:
              Web development has evolved tremendously over the years, adapting to changing technologies and user expectations. From static websites to dynamic web applications and PWAs, the journey has been remarkable. By keeping up with trends and embracing emerging technologies, web developers can continue to create innovative and impactful digital experiences.
              
              Please note that the above blog posts are provided as examples, and you can modify and expand upon them to align with your desired content style and website theme. Additionally, make sure to include the disclaimer prominently on your blog website to clarify that the posts are AI-generated for demonstration purposes.
              
              Disclaimer: This blog post is written by an AI for example purposes and to showcase the website's working.`
  }
];