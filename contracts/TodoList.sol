pragma solidity ^0.5.0;

contract TodoList {
    uint256 public listLength = 0;
    event EventOfCreate(
       uint256  listLength,
       string status
    );
    
    struct Todo{
        string name;
        bool finished;
        uint256 number;
        bool deprecation;
    }
    Todo[] public todoList;
    
    function addTodo(string memory _name)public{
        Todo memory _todo; 
        _todo = Todo(_name,false,listLength,false);  // Todo memory _todo = Todo(_name,false,listLength,false);
        todoList.push(_todo);
        emit EventOfCreate(listLength,"finised");
        listLength+=1;
    }
    function toggle(uint256 _number)public{
        require(todoList[_number].deprecation!=true,'have deprecated');
        todoList[_number].finished = !todoList[_number].finished;
    }
    function deleteTodo(uint256 _number)public{
        todoList[_number].deprecation = true;
    }
    
}