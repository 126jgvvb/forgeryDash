import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serverIP from "../serverIP";

const adminID=localStorage.getItem('verified-user');

const initialState={

    staticData:{ },


    dynamicData:{
        serverActive:false,
        lastForgeryAttempt:"2025-09-03 12:23",
        adminDetails:{},
        forgeries:[
            {
                id:"1233",
                name:"Ainembabazi elizabeth",
                msisdn:"0741882818",
                images:[],
                MSISDNS:[],
                attempts:[{
                    attemptId:"1223",
                    attemptNo:"1",
                    timeStamp:"abc",
                    changedProperty:["Image"],
                    constantProperties: ["MSISDN", "Name"],
                    newImages:[] //can be the same as the saved ones
                }],
                timeStamp:"2025-09-03 12:23"
            },
            {
                id:"1234",
                name:"coded delos",
                msisdn:"0741882818",
                images:[],
                MSISDNS:[],
                attempts:[{
                    attemptId:"1223",
                    attemptNo:"1",
                    timeStamp:"abc",
                    changedProperty:["Image"],
                    constantProperties: ["MSISDN", "Name"],
                    newImages:[] //can be the same as the saved ones
                }],
                timeStamp:"2025-09-03 12:23"
            },
            {
                id:"1235",
                name:"wadika kevin",
                msisdn:"0741882818",
                images:[],
                MSISDNS:[],
                attempts:[{
                    attemptId:"1223",
                    attemptNo:"1",
                    timeStamp:"abc",
                    changedProperty:["Image"],
                    constantProperties: ["MSISDN", "Name"],
                    newImages:[] //can be the same as the saved ones
                }],
                timeStamp:"2025-09-03 12:23"
            },
          
        ], 
    }
}


const defaultSlice=createSlice({
name:"defaultSlice",
initialState,
reducers:{
    deleteForgery:(state,action)=>{
    state.dynamicData.forgeries=state.dynamicData.forgeries.filter(item=>item.id!=(action.payload.forgeryID));
    },
    addForgery:(state,action)=>{
        state.dynamicData.forgeries=state.dynamicData.forgeries.push(action.payload);
    }
},
extraReducers:(builder)=>{
    builder
    .addCase(getOnlineData.pending,(state,action)=>{
        console.log('Request is in pending state....');
    })

    .addCase(getOnlineData.fulfilled,(state,action)=>{
        if(action.payload==undefined){
            console.error('Failed to download data....server connection failed!!');
            return false;
        }

        console.log("redux data downloaded...assigning data");
        state.dynamicData.adminDetails=action.payload.dynamicData.adminDetails;  //assigning the obtained data
        state.dynamicData.forgeries=action.payload.dynamicData.forgeries;
        state.dynamicData.serverActive=action.payload.dynamicData.serverActive;
        state.dynamicData.lastForgeryAttempt=action.payload.dynamicData.lastForgeryAttempt;

        let temp=[];
        for(let obj in state.dynamicData.forgeries){
            state.dynamicData.forgeries[obj]['MSISDNS']=state.dynamicData.forgeries[obj].msisdn;
            temp.push(state.dynamicData.forgeries[obj]);
        }

        console.log(">>>>>>>>"+temp);
        state.dynamicData.forgeries=temp;

        console.log('Done assigning data....');
        console.log(' data....', state.dynamicData.forgeries);
    });


    builder
    .addCase(pingServer.pending,(state,action)=>{
        console.log('checking server state...');
    })

    .addCase(pingServer.fulfilled,(state,action)=>{
        if(action.payload==undefined){
            console.error('server connection failed!!');
            return false;
        }

        state.dynamicData.serverActive=action.payload; 
        console.log("server state obtained as",state.dynamicData.serverActive);
    });
}
});



export const pingServer=createAsyncThunk("ping server",async()=>{
    console.log(`pinging server at: ${serverIP}/admin/ping`);
         
    try{
   return await fetch(`${serverIP}/admin/ping`)
            .then(resp =>{
                 if(!resp.ok){
                    return false;
                 }
                    return resp.json();
                })
            .then((resp) => {
                if (resp.status==200) { return true; }
                else {
                    console.log('Server failed to respond...');
                    return false;
                }

            })
            .catch((err) => console.error(err));
           }
           catch(e){ console.log(`server error: ${e}`);  }
});


export const getOnlineData=createAsyncThunk("get-redux-state",
    async ()=>{ 
             console.log(`connecting to: ${serverIP}/admin/get-redux-object`);
         
             try{
            return await fetch(`${serverIP}/admin/get-redux-object`)
                     .then(resp => resp.json())
                     .then((resp) => {
                        //inspect this line
                         if (resp.data !== undefined) { return resp.data; }
                         else {
                             if ( resp.data !== undefined) console.log(resp.message);
                             else console.log('Network error...');
                             return false;
                         }
         
                     })
                     .catch((err) => console.error(err));
                    }
                    catch(e){ console.log(`Download error: ${e}`);  }
                }
                    
                
);

//pingServer();
export const {deleteForgery,addForgery}=defaultSlice.actions;
export default defaultSlice.reducer;





