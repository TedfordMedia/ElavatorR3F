import create from "zustand"

 function setupLevelsData(){ 
  //maybe should move this to a JSON file, TBC

  //TEST DATA
  var data = [];
  var obj = {};
  
  obj['backg'] = 'dawn';
  obj['name'] = 'groundlevel';
  data.push(obj)

  obj = {};
  obj['backg'] = 'night';
  obj['name'] = '1level';
  data.push(obj)

  obj = {};
  obj['backg'] = 'forest';
  obj['name'] = '2level';
  data.push(obj) 

  obj = {};
  obj['backg'] = 'sunset';
  obj['name'] = '3level';
  data.push(obj) 

  obj = {};
  obj['backg'] = 'park';
  obj['name'] = '4level';
  data.push(obj) 

  obj = {};
  obj['backg'] = 'lobby';
  obj['name'] = '5level';
  data.push(obj) 

  return data;  
}

function setupPersonData(){  

  //TEST DATA
  var data = [];
  var obj = {};
   
  obj['name'] = 'Unknown Person Here!';
  data.push(obj)

  obj = {};
  obj['name'] = 'Sally jones'; 
  data.push(obj)

  obj = {};
  obj['name'] = 'Andrew Brown'; 
  data.push(obj) 

  obj = {};
  obj['name'] = 'John Green'; 
  data.push(obj) 

  obj = {}; 
  obj['name'] = 'Susan Smith';
  data.push(obj) 

  obj = {}; 
  obj['name'] = 'Fred Jones';
  data.push(obj) 

  return data;  
}

const useStore = create((set) => ({ 
    floor: 0,
    triggerRaiser: false, 
    levelsDataArray:  setupLevelsData(),
    peopleArray: setupPersonData(),
    doorOpener: false, 
    doorCloser: false,  
    personDisplayName: '' ,
    clearRaiser: () => set(state => ({ triggerRaiser: false })), 
    clearDoorOpener: () => set(state => ({ doorOpener: false })), 
    clearDoorCloser: () => set(state => ({ doorCloser: false })), 
    upRaiser: () => set(state => ({ triggerRaiser: true })),  

    setName: ( name ) => { 
      console.log('set the name!!!'+name)
      set(state => ({ personDisplayName: name }))
    },

    goUpFloor: () => { 
      // set(state => ({ floor: state.floor + 1 }));
      // console.log('i should goUpFloor')
    },

    doorOpen: () => { 
      console.log('doorOpen')
      set(state => ({ floor: state.floor + 1, doorCloser: false , doorOpener: true }));
    },

    doorClose: () => { 
      set(state => ({ doorCloser: true , doorOpener: false }));
      console.log('doorClose')
    },
   
}));

export default useStore;