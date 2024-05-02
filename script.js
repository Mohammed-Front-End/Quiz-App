// Select 




function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if(this.readyState === 4 && this.status ===200){
      let questionsObject = JSON.parse(this.responseText)
      console.log(questionsObject);
    }

  }

  myRequest.open('GET','questions.JSON',true);
  myRequest.send();

}
getQuestions() 















