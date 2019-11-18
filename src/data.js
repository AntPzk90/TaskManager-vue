async function data () {
  let data = await fetch (" https://htmlacademy-es-9.appspot.com/task-manager/");
  let tasks = await data.json();
  return tasks
}
console.log(data())
