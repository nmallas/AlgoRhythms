import React, { useState, useEffect } from "react";
import {BarChart, CartesianGrid, YAxis, Bar, Cell, ResponsiveContainer} from "recharts";



export default function Visuals(props) {
    const arr = [8,5,6,12,2,9,1,4]
    const [data, setData] = useState(arr.map((el, i) => ({index: i, val: el})));
    const [finished, setFinished] = useState(false);
    let currentTimeouts = [];

    const updateData = (arrCopy, k, c) => setData(arrCopy.map((el, i) => ({index: i, val: el, current: k, completed: c})));

    const clearTimeouts = () => {
        currentTimeouts.forEach(timeout => clearTimeout(timeout))
    }

    useEffect(()=> clearTimeouts, [])

    function sleep (time) {
        return new Promise((resolve) => {
            let timeout = setTimeout(resolve, time);
            currentTimeouts.push(timeout)
            return timeout;
        });
    }


    const bubbleSort = async (arr) => {
        setFinished(false);
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
        setFinished(true);
        return arrCopy
    }

    const selectionSort = async (arr) => {
        setFinished(false);
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
        setFinished(true);
        return arrCopy
    }

    const insertionSort = async(arr) => {
        setFinished(false);
        let arrCopy = [...arr];
        let current = [0];
        for(let i=1; i<arrCopy.length; i++) {
            for(let j=i; j>0; j--) {
                if(arrCopy[j] < arrCopy[j-1] ) {
                    [arrCopy[j], arrCopy[j-1]] = [arrCopy[j-1], arrCopy[j]];
                    updateData(arrCopy, current, [j-1]);
                    await sleep(300 * j);
                }

            }
            current.push(i);
        }
        current.push(arr.length-1)
        updateData(arrCopy, current, []);
        setFinished(true);
        return arrCopy;
    }


    const quickSort = function(arr) {
        if(arr.length < 2) return arr;
        let pivot = arr.shift()
        let left = [];
        let right = [];
        for(let i=0; i<arr.length; i++) {
          if(arr[i] < pivot) {
            left.push(arr[i])
          } else {
            right.push(arr[i])
          }
        }
        let leftSorted = quickSort(left);
        let rightSorted = quickSort(right);
        return [...leftSorted, pivot, ...rightSorted]
    }

    function mergeSort(arr) {
        const merge = (arr1, arr2) => {
          let arr = [];
          while(arr1.length && arr2.length) {
            if(arr1[0] <= arr2[0]) {
              arr.push(arr1.shift())
            } else {
              arr.push(arr2.shift())
            }
          }
          return [...arr, ...arr1, ...arr2]
        }

        if(arr.length < 2) return arr;
        let pivot = Math.floor((arr.length)/2)
        let left = arr.slice(0, pivot)
        let right = arr.slice(pivot)
        let sortedLeft = mergeSort(left);
        let sortedRight = mergeSort(right);
        return merge(sortedLeft, sortedRight)

    }






    const handleSort = (e) => {
        e.preventDefault();
        if(e.target.id === "bubble") {
            bubbleSort(arr);
        } else if ((e.target.id === "selection")) {
            selectionSort(arr);
        } else {
            insertionSort(arr);
        }
    }

    return (
        <div className="visual-container">
            <div className="chart-container">
            <ResponsiveContainer width="70%" height={350}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis dataKey="index" /> */}
                    <YAxis />
                    {/* <Tooltip position={{"x": 25, "y": 0}} animationDuration={2500}/> */}
                    <Bar dataKey="val" >
                    {
                        data.map((entry, i) => {
                            const color = (entry.completed?.includes(i)) ? "#ed6663" :
                                        (entry.current?.includes(i)) ? "#ffa372":
                                        "#4e89ae";
                            return <Cell fill={color} />;
                        })
                    }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            </div>
            <div className="visual-button-container">
                <button id="bubble" onClick={handleSort}> BubbleSort</button>
                <button id="selection" onClick={handleSort}> SelectionSort</button>
                <button id="insertion" onClick={handleSort}> InsertionSort</button>
            </div>
            { !finished ? null :
            <div className="visual-button-container" >
                <button id="reset" onClick={()=> setData((arr.map((el, i) => ({index: i, val: el}))))}>
                    Reset
                </button>
            </div>
            }
        </div>
    )
}
