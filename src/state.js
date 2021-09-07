import create from "zustand"

 function setupLevelsData(){ 
  //maybe should move this to a JSON file, TBC

  //TEST DATA
  var data = [];
  var obj = {};
  
  obj['backg'] = 'dawn';
  obj['name'] = 'firstlevel';
  data.push(obj)

  obj = {};
  obj['backg'] = 'night';
  obj['name'] = 'secondlevel';
  data.push(obj)

  obj = {};
  obj['backg'] = 'forest';
  obj['name'] = 'thirdlevel';
  data.push(obj) 

  obj = {};
  obj['backg'] = 'sunset';
  obj['name'] = 'forthlevel';
  data.push(obj) 

  obj = {};
  obj['backg'] = 'park';
  obj['name'] = 'fifthlevel';
  data.push(obj) 

  obj = {};
  obj['backg'] = 'lobby';
  obj['name'] = 'sixthlevel';
  data.push(obj) 

  return data;  
}

const useStore = create((set) => ({ 
    floor: 0,
    triggerRaiser: false, 
    levelsDataArray:  setupLevelsData(),
    doorOpener: false, 
    doorCloser: false, 
    clearRaiser: () => set(state => ({ triggerRaiser: false })), 
    clearDoorOpener: () => set(state => ({ doorOpener: false })), 
    clearDoorCloser: () => set(state => ({ doorCloser: false })), 
    upRaiser: () => set(state => ({ triggerRaiser: true })),  

    goUpFloor: () => { 
      // set(state => ({ floor: state.floor + 1 }));
      console.log('i should goUpFloor')
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