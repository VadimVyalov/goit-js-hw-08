import throttle from 'lodash.throttle';

const formFB = document.querySelector('.feedback-form');

const THROTTLE_TIME=500; // ms
const LS_KEY_FEEDBACK_FORM="feedback-form-state"

// function >>>>>
const saveLS = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set LS state error: ", error.message);
  }
};

const loadLS = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get LS state error: ", error.message);
  }
};

const saveFeedback = (evt) =>{
    const formData=new FormData(formFB); 

    //! const formData=new FormData(evt.currentTarget); 
    //! evt.currentTargen працює нестабільно  разом з throttle  
    
    // let data = {};
    // formData.forEach((value, key) => data[key] = value);
    // saveLS(LS_KEY_FEEDBACK_FORM, data);

     saveLS(LS_KEY_FEEDBACK_FORM, Object.fromEntries(formData));
    
};

const clearFeedback = (evt) =>{
    evt.preventDefault();
  
    localStorage.removeItem(LS_KEY_FEEDBACK_FORM);
  
    const data=new FormData(evt.currentTarget); 
    console.log(Object.fromEntries(data));
    evt.currentTarget.reset();
  };

  const updateForm=() =>{
    const data=loadLS(LS_KEY_FEEDBACK_FORM);
    //console.log(data);
    if (data) {
        formFB.elements.message.value=data.message;
        formFB.elements.email.value=data.email;
    }
    };

// main >>>>>>>>

updateForm();
formFB.addEventListener('input',throttle(saveFeedback,THROTTLE_TIME));
// formFB.addEventListener('input',saveFeedback);
formFB.addEventListener('submit', throttle(clearFeedback,THROTTLE_TIME));


