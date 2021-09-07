import create from "zustand"

function myfunc(set){
 
}
const useStore = create((set) => ({
    dollars: 8,
    people: 1,
    floor: 0,
    triggerRaiser: false,
    bears: 0,
    clearRaiser: () => set(state => ({ triggerRaiser: false })), 
    upRaiser: () => set(state => ({ triggerRaiser: true })), 
    inc: () => set(state => ({ dollars: (state.dollars + 1) % 4 })),  
    goUpFloor: () => set(state => ({ floor: (state.floor + 1) % 4 })),  

}));

export default useStore;