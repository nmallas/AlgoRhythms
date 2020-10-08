import React, { useState } from "react";
import {BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell} from "recharts";



export default function Visuals(props) {
    const arr = [8,3,6,12,2,9,1]
    const [data, setData] = useState(arr.map((el, i) => ({index: i, val: el})))

    const updateData = (arrCopy, k, c) => setData(arrCopy.map((el, i) => ({index: i, val: el, current: k, completed: c})));


    // const renderCurrent = (arrCopy) => {
    //     console.log(arrCopy, n)
    //     setTimeout(function updateGraph(){
    //         updateData(arrCopy)
    //     }, (1000 * n))
    // }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    const bubbleSort = async (arr) => {
        let arrCopy = [...arr];
        let completed = [];
        for(let i=arr.length; i>=0; i--) {
          for(let j=0; j<i; j++) {
            if(arrCopy[j] > arrCopy[j+1]) {
                [arrCopy[j], arrCopy[j+1]] = [arrCopy[j+1], arrCopy[j]]
            }
            completed.push(i);
            await sleep(200 * j)
            updateData(arrCopy, [j, j+1], completed)
          }
        }
        completed.push(0);
        updateData(arrCopy, [], completed);
        return arrCopy
    }

    const selectionSort = async (arr) => {
        let arrCopy = [...arr];
        let completed = [];
        for(let i=0; i<arr.length; i++) {
            let min = arrCopy[i];
            let minIndex = i;
            for(let j=i+1; j<arr.length; j++) {
                if (arrCopy[j] < min)  {
                    min = arrCopy[j];
                    minIndex = j;
                }
                await sleep(200 * j);
                updateData(arrCopy, [minIndex, j], completed);

            }
            [arrCopy[i], arrCopy[minIndex]] = [arrCopy[minIndex], arrCopy[i]];
            completed.push(i);
        }
        completed.push(arr.length -1);
        updateData(arrCopy, [], completed);
        return arrCopy
    }

    const handleSort = (e) => {
        e.preventDefault();
        if(e.target.id === "bubble") {
            bubbleSort(arr);
        } else if ((e.target.id === "selection")) {
            selectionSort(arr);
        }
    }

    return (
        <div >
            <button id="bubble" onClick={handleSort}> BubbleSort</button>
            <button id="selection" onClick={handleSort}> SelectionSort</button>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                {/* <XAxis dataKey="index" /> */}
                <YAxis />
                <Bar dataKey="val" >
                {
                    data.map((entry, i) => {
                        console.log(i, entry.current)
                        const color = (entry.completed?.includes(i)) ? "#ed6663" :
                                      (entry.current?.includes(i)) ? "#ffa372":
                                      "#4e89ae";
                        return <Cell fill={color} />;
                    })
                }
                </Bar>
            </BarChart>
        </div>
    )
}
