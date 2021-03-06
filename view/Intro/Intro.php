<!DOCTYPE html>
<html>
<!--lang: ngôn ngữ của các phần tử có thể chỉnh sửa hoặc không trong-->

<head lang="en">
    <!--khái cách decode của trang-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My CV</title>
    <link href="https://fonts.googleapis.com/css?family=Akshar|Montserrat:400,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <main>
        <!-- ***************  Hồ sơ  **************** -->
        <header>
            <div class="left-panel">
                <div class = "imgClot">
                    <img src="./images/ava.jpg" alt="">
                </div>
            </div>
            <div class="content-wrap">
                <h1>Tien An Nguyen</h1>
                <h2>IT student</h2>
                <p>Undergraduated</p>
                <p>Ho Chi Minh City University of Science</p>
            </div>
            
        </header>
        <!-- ************ PROJECTS / PORTFOLIO  ************** -->

        <div class="projects">
            <div class="content-wrap divider">
                <h2>Data projects</h2>
                <p>View projects below. More information can be found at <a href="https://github.com/">Github.com</a>.
                </p>
                <!-- Project 1 -->
                <div class="project-item">
                    <img src="./images/chuong-trinh-don-gian.jpg" alt="Chuong trinh Python don gian">
                    <h3>Simple data manipulation program in Python</h3>
                    <p>Some simple functions written in Python to work with data</p>
                    <a class="btn" href="https://github.com/myus3rnam3159/ChuongTrinhDonGian">Github repository</a>
                    <a class="btn"
                        href="https://colab.research.google.com/drive/1f875tOsDhPWHHBBASFWcb8zRXzpns0OQ?usp=sharing">GoogleColab
                        notebook</a>
                </div>

                <!-- Project 2 -->
                <div class="project-item">
                    <img src="./images/demo-vector.jpg" alt="Demo Vector don gian">
                    <h3>Simple Vector Demonstration in Python</h3>
                    <p>Some simple operations on vector written in Python</p>
                    <a class="btn" href="https://github.com/myus3rnam3159/DemoVectoDonGian">Github repository</a>
                    <a class="btn"
                        href="https://colab.research.google.com/github/myus3rnam3159/DemoVectoDonGian/blob/master/vector.ipynb">GoogleColab
                        notebook</a>
                </div>
            </div>
        </div>

        <!-- ****************  LEARN EXPERIENCE  ******************** -->
        <div class="learn-experience">
            <div class="content-wrap item-details divider">
                <h2>Learning Experience</h2>
                <p>See my University's Education Program here on <a
                        href="https://www.ctdb.hcmus.edu.vn/vi/educational-program/chuong-trinh-chat-luong-cao/">APCS</a>
                </p>

                <!--Job 1-->
                <div class="job-item">
                    <div class="job-details">
                        <h3>ETL source to NDS</h3>
                        <p>Team lead</p>
                        <p>March 2021</p>
                    </div>
                    <div class="job-summary">
                        <p>Operate ETL procress from sources to stage and from state to NDS store</p>
                    </div>
                </div>

                <!--Job 2-->
                <div class="job-item">
                    <div class="job-details">
                        <h3>Ecommerce website project team lead</h3>
                        <p>Lead and work with the development team to create website for a clothes store</p>
                        <p>Key contributions:</p>
                        <ul>
                            <li>Back-end programming</li>
                            <li>Front-end programming</li>
                            <li>Database design and deploy</li>
                            <li>Document writing</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- *************  OTHER EDUCATION & CERTIFICATIONS *********** -->
        <div class="education">
            <div class="content-wrap item-details">
                <h2>Certificates</h2>
                <div>
                    <h3>Google Data Analytics Professional</h3>
                    <p>Data analysis usings excel, googlesheet, python, power BI and so on</p>
                    <p>3 month online learning</p>
                </div>
                <div>
                    <h3>IBM fullstack developer </h3>
                    <p>Full stack app - web development</p>
                    <p>Programming with nodejs, htmt, css, reacjs, python for ai development in 15-weeks course</p>
                </div>
            </div>
        </div>
        <!-- ************  CONTACT INFO / SOCIAL MEDIA  ************ -->
        <footer>
            <div class="content-wrap">
                <h2>Contact</h2>
                <!-- Social media and contact links. Add or remove any networks. -->
                <ul class="contact-list">
                    <li>My Gmail: <a>dcmtd2021@gmail.com</a></li>
                    <li>My Discord server: <a>https://discord.gg/Z4X2VpYG</a></li>
                    <li>My phone: <a>0948206373</a></li>
                </ul>
            </div>
        </footer>
    </main>
</body>

</html>

