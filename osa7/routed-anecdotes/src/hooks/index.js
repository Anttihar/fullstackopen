import { useState } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')
  console.log('type:', type, 'value', value)
  if (type === 'reset') {
    const onClick = () => {
      setValue('')
      console.log('reset')
    }
    return {
      type,
      onClick
    }
  } else {
    const onChange = (event) => {
      setValue(event.target.value)
      console.log('text')
    }
    return {
      type,
      value,
      onChange
    }
  }
}

  /* else if ( type === 'reset') {
    console.log('===')
    content.value = ''
    author.value = ''
    info.value = ''
  
    return {
      
    }
  }
  
  
}

export const useReset = (type, content, author, info) => {
  console.log(type, content, author, info)
  const onClick = () => {
    content = ''
    author = ''
    info = ''
  }

  return {
    type,
    onClick
  }
}
*/