# Stack overflow
### Technologies

- **NodeJS**
- **Express**
- **MongoDB**
- **Bootstrap**

### Routes

- **`[GET] /`               - redirect to `/question`**
- **`[GET] /question`       - list of all questions and form for asking**
- **`[POST] /question`      - creates new question**
- **`[GET] /question/{id}`  - shows selected question, all answers and form for answering**
- **`[POST] /question/{id}` - creates new answer for question with selected id**

### Settings
- **Express server waits for connection on port 3000**
- **MongoDB should listen on default port 27017**


#### Page with all question
![alt text](https://github.com/Yuriy27/kpp-lab2/blob/master/images/questions.png)
<br>
  
#### Page with selected question and answers
![alt text](https://github.com/Yuriy27/kpp-lab2/blob/master/images/answers.png)
<br>

### How to run (node and mongo should be installed)
1. Run `mongod` to start mongo
1. Run `git clone https://github.com/Yuriy27/kpp-lab2`
1. Run `cd kpp-lab2`
1. Run `npm install`
1. Run `node app.js`

