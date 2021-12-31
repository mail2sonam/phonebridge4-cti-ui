import React from "react";
import { useState, useEffect } from 'react'
import { getInsightsAnonymousUserToken } from "react-instantsearch-dom";
import EventSource from 'sse-events';
 function POCtest(){
   
    const sse = new EventSource({
      url: "http://104.154.188.48:8081/stream/accid/topicname/abcd",
      options: {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJHcWFzYjNGZ2s5QmJEZk9OS3R1RE54N3VsczdqajlJZ1hGSUgxaDVnTVJ3In0.eyJleHAiOjE2NDA3Njg1NjgsImlhdCI6MTY0MDc2ODI2OCwianRpIjoiYzQyNTkwMGYtYzBkYy00ODc3LWFiNWEtZjE1MWNjMzExNzA4IiwiaXNzIjoiaHR0cDovLzM0LjEzNC4xNDkuODU6ODA4MC9hdXRoL3JlYWxtcy9waG9uZWJyaWRnZS1jdGkiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWQ2MzEzYWItZTQyYi00MmQ2LTkyNGItZDhkOWQ5Njk4N2RiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicGhvbmVicmlkZ2UtY3RpLWNsaWVudCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1waG9uZWJyaWRnZS1jdGkiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicGhvbmVicmlkZ2UtY3RpLWNsaWVudCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImNsaWVudEhvc3QiOiIxMC4xMjguMC40IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6InBob25lYnJpZGdlLWN0aS1jbGllbnQiLCJ1c2VyX25hbWUiOiJzZXJ2aWNlLWFjY291bnQtcGhvbmVicmlkZ2UtY3RpLWNsaWVudCIsInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1waG9uZWJyaWRnZS1jdGktY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjEwLjEyOC4wLjQifQ.Ckds-9RDVZofPj0_7pekLNAS0NrGezGb-O-4JuH2tCnmXPlWZpK6O5KfgU6L1qJW2KXb85Jgi_8FROMk0I9apjQmwq_n5FCavSx6D_ZU6M1016gn78tv_ojOisckttzuIY8BmbfRzoWuxYW12qanXMpB_mxhzr46qL83Z5GwBEpWst77jHCukE6fXHXDBYm3Jz0q8zykuSKXuAwOf1gq4iThV1oA16BptNPVde3Hv-QVHKyubgpPQN5myOijc5GEfmOwMqeAsf7jXE5qfuvDlHuAIVnNXDg3crxrLxcLIcuKXLkIG9BFdHXUwlt8h0WRtF8b5qF9rsHGpEFaMR0epg'  
            }
      },
      reconnectInterval: 500,
      retryOnNetworkError: false
    });
    sse.open();
    sse.addEventListener('message', (e) => {
      console.log(e.data);
    
    });
     
      /*   let  eventSource = new EventSource('http://104.154.188.48:8081/stream/accid/topicname/abcd', {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
            Authorization: "Bearer neelima",
          }});
      eventSource.onopen = (event) => {
        console.log("connection opened")
      }
      
      eventSource.onmessage = (event) => {
        console.log("result", event.data);
      //  setData(old => [...old, event.data])
      }*/
    


    return(
        <div>


        </div>
    )
    }
export default POCtest;