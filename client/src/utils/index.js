import {surpriseMePrompts} from '../constants'
import FileSaver from 'file-saver'

export function getRandomPrompt(prompt){
    const randomIndex=Math.floor(Math.random()*surpriseMePrompts.length)
    const randomPrompt=surpriseMePrompts[randomIndex]

    if(randomPrompt===prompt) return getRandomPrompt(prompt)

    return randomPrompt
} 

export async function downloadImage(_id,photo){
    /*
    This code saves a photo file with the name "download-" followed by the value of the variable _id and the file extension ".jpg". 
    The FileSaver.saveAs() method is used to save the file with the specified name. 
    The photo variable contains the actual photo data that is being saved.
    */
    FileSaver.saveAs(photo,`download-${_id}.jpg`)
}