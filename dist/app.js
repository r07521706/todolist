window.App = {
    loading: false,
    contracts: {},
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
      },
    loadWeb3: async () => {
            App.web3Provider = web3.currentProvider
            web3= new Web3(web3.currentProvider)
            console.log('use metamask')
        },
    loadAccount: async () => {
        App.account =  await web3.eth.getAccounts()
        console.log(App.account)
        $('#account').html(App.account)
        },
    loadContract: async () => {
        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)
        App.todoList = await App.contracts.TodoList.deployed()
        },
    render: async () => {
        await App.renderTasks()
        },
    renderTasks: async () => {
        $("#overlay").show();
        let listLength = await App.todoList.listLength()
        let tmp_ans;
        let tmp_ans_list = []
        for( var i = 0; i<listLength;i++){
             tmp_ans = await App.todoList.todoList(i)
             tmp_ans_list.push(tmp_ans)
        }   
        for( var i = 0; i<listLength;i++){
            let tmp_ans = tmp_ans_list[i]
            console.log(tmp_ans[0],tmp_ans[1],tmp_ans[3])
            if(tmp_ans[3]===true) continue;
            let var_p = document.createElement("p")
            let var_div2 = document.createElement("div")
            let checkbox = document.createElement('input')
            $(checkbox).attr("name",i)
            let label1 = document.createElement("label")
            $(label1).attr("for",i)
            let checkbox2 = document.createElement('input')
            let wrapper = document.createElement("div")
            wrapper.className="wrapper"

            checkbox.type = "checkbox"
            checkbox2.type = "checkbox"
            $(checkbox2).attr("name",i)
            let label2 = document.createElement("label")
            $(label2).attr("for",i)
            $(checkbox).prop('checked',tmp_ans[1])



            label1.onclick=async (e)=>{
                $("#overlay").show();
                await App.todoList.toggle(tmp_ans[2]['c'][0])
                $(".wrapper").remove()
                App.renderTasks()
                // $("#overlay").hide()
            }
            $(checkbox2).prop('checked',tmp_ans[3])
            label2.onclick=async (e)=>{
                $("#overlay").show();
                await App.todoList.deleteTodo(tmp_ans[2]['c'][0])
                $(".wrapper").remove()
                App.renderTasks()   
            }
            var_p.innerHTML = tmp_ans[0]
            if(tmp_ans[1]===true){
                $(var_p).css("text-decoration" ,"line-through")
            }
            else if (tmp_ans[1]===false){
                $(var_p).css("text-decoration" ,"none")
            }
            var_div2.innerHTML = '<p>-刪除</p>'
            var_div2.className = "del-info"
            wrapper.append(checkbox)
            wrapper.append(label1)
            wrapper.append(var_p)
            wrapper.append(var_div2)
            var_div2.append(checkbox2)
            var_div2.append(label2)
            wrapper.append(var_div2)
            $('#taskList').append(wrapper)
        }
        $("#overlay").hide();
        },
        createTask: async () => {
            const content = $('#newTask').val()
            $("#overlay").show();
            const result = await App.todoList.addTodo(content)
            console.log(result)
            

            var subscription = web3.eth.subscribe('logs', {
                address: '0x7f9A7058336D81920D9AD9c58895cA6E5a2d2cd3',
                topics: ['0x7f9A7058336D81920D9AD9c58895cA6E5a2d2cd3']
            }, function(error, result){
                if (!error)
                    console.log(result);
                    window.location.reload()
                    
            });
            
            // unsubscribes the subscription
            subscription.unsubscribe(function(error, success){
                if(success)
                    console.log('Successfully unsubscribed!');
                    $("#overlay").hide();
            });


          },
}

$(function() {
    $(window).load(function() {
      App.load();
    });
  });