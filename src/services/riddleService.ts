
interface args  {
  tags:Boolean[]
  title:string
  file:string
  answer:string 
}
interface res {
  error:Boolean
}
export async function saveRiddle(args:args):Promise<res>{
    console.log(args)
  const result =  await fetch('aaa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  })
  return {error:result.status !== 200}
}