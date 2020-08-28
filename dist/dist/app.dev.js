"use strict";

window.App = {
  loading: false,
  contracts: {},
  load: function load() {
    return regeneratorRuntime.async(function load$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(App.loadWeb3());

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(App.loadAccount());

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(App.loadContract());

          case 6:
            _context.next = 8;
            return regeneratorRuntime.awrap(App.render());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  loadWeb3: function loadWeb3() {
    return regeneratorRuntime.async(function loadWeb3$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!window.ethereum) {
              _context2.next = 12;
              break;
            }

            App.web3Provider = window.ethereum;
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(window.ethereum.enable());

          case 5:
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](2);
            // User denied account access...
            console.error("User denied account access");

          case 10:
            _context2.next = 13;
            break;

          case 12:
            // Legacy dapp browsers...
            if (window.web3) {
              App.web3Provider = window.web3.currentProvider;
            } // If no injected web3 instance is detected, fall back to Ganache
            else {
                App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
              }

          case 13:
            web3 = new Web3(App.web3Provider);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 7]]);
  },
  loadAccount: function loadAccount() {
    return regeneratorRuntime.async(function loadAccount$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(web3.eth.getAccounts());

          case 2:
            App.account = _context3.sent;
            web3.eth.defaultAccount = App.account[0];
            $('#account').html(App.account);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  loadContract: function loadContract() {
    var todoList;
    return regeneratorRuntime.async(function loadContract$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap($.getJSON('TodoList.json'));

          case 2:
            todoList = _context4.sent;
            App.contracts.TodoList = TruffleContract(todoList);
            App.contracts.TodoList.setProvider(App.web3Provider);
            _context4.next = 7;
            return regeneratorRuntime.awrap(App.contracts.TodoList.deployed());

          case 7:
            App.todoList = _context4.sent;

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  render: function render() {
    return regeneratorRuntime.async(function render$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(App.renderTasks());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  renderTasks: function renderTasks() {
    var listLength, tmp_ans, tmp_ans_list, i, _loop, _i, _ret;

    return regeneratorRuntime.async(function renderTasks$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            $("#overlay").show();
            _context8.next = 3;
            return regeneratorRuntime.awrap(App.todoList.listLength({
              from: App.account[0]
            }));

          case 3:
            listLength = _context8.sent;
            tmp_ans_list = [];
            i = 0;

          case 6:
            if (!(i < listLength)) {
              _context8.next = 14;
              break;
            }

            _context8.next = 9;
            return regeneratorRuntime.awrap(App.todoList.todoList(i, {
              from: App.account[0]
            }));

          case 9:
            tmp_ans = _context8.sent;
            tmp_ans_list.push(tmp_ans);

          case 11:
            i++;
            _context8.next = 6;
            break;

          case 14:
            _loop = function _loop(_i) {
              var tmp_ans = tmp_ans_list[_i];
              if (tmp_ans[3] === true) return "continue";
              var var_p = document.createElement("p");
              var var_div2 = document.createElement("div");
              var checkbox = document.createElement('input');
              $(checkbox).attr("name", _i);
              var label1 = document.createElement("label");
              $(label1).attr("for", _i);
              var checkbox2 = document.createElement('input');
              var wrapper = document.createElement("div");
              wrapper.className = "wrapper";
              checkbox.type = "checkbox";
              checkbox2.type = "checkbox";
              $(checkbox2).attr("name", _i);
              var label2 = document.createElement("label");
              $(label2).attr("for", _i);
              $(checkbox).prop('checked', tmp_ans[1]);

              label1.onclick = function _callee(e) {
                return regeneratorRuntime.async(function _callee$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        $("#overlay").show();
                        _context6.next = 3;
                        return regeneratorRuntime.awrap(App.todoList.toggle(_i, {
                          from: App.account[0]
                        }));

                      case 3:
                        $(".wrapper").remove();
                        App.renderTasks(); // $("#overlay").hide()

                      case 5:
                      case "end":
                        return _context6.stop();
                    }
                  }
                });
              };

              $(checkbox2).prop('checked', tmp_ans[3]);

              label2.onclick = function _callee2(e) {
                return regeneratorRuntime.async(function _callee2$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        $("#overlay").show();
                        _context7.next = 3;
                        return regeneratorRuntime.awrap(App.todoList.deleteTodo(_i, {
                          from: App.account[0]
                        }));

                      case 3:
                        $(".wrapper").remove();
                        App.renderTasks();

                      case 5:
                      case "end":
                        return _context7.stop();
                    }
                  }
                });
              };

              var_p.innerHTML = tmp_ans[0];

              if (tmp_ans[1] === true) {
                $(var_p).css("text-decoration", "line-through");
              } else if (tmp_ans[1] === false) {
                $(var_p).css("text-decoration", "none");
              }

              var_div2.innerHTML = '<p>delete</p>';
              var_div2.className = "del-info";
              wrapper.append(checkbox);
              wrapper.append(label1);
              wrapper.append(var_p);
              wrapper.append(var_div2);
              var_div2.append(checkbox2);
              var_div2.append(label2);
              wrapper.append(var_div2);
              $('#taskList').append(wrapper);
            };

            _i = 0;

          case 16:
            if (!(_i < listLength)) {
              _context8.next = 23;
              break;
            }

            _ret = _loop(_i);

            if (!(_ret === "continue")) {
              _context8.next = 20;
              break;
            }

            return _context8.abrupt("continue", 20);

          case 20:
            _i++;
            _context8.next = 16;
            break;

          case 23:
            $("#overlay").hide();

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  createTask: function createTask() {
    var content, result, subscription;
    return regeneratorRuntime.async(function createTask$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            content = $('#newTask').val();
            $("#overlay").show();
            _context9.next = 4;
            return regeneratorRuntime.awrap(App.todoList.addTodo(content, {
              from: App.account[0]
            }));

          case 4:
            result = _context9.sent;
            window.location.reload(); // $("#overlay").hide();

            subscription = web3.eth.subscribe('logs', {
              address: App.todoList.address,
              topics: [App.todoList.address]
            }, function (error, result) {
              if (!error) ;
              setTimeout(function () {
                App.renderTasks();
              }, 1000);
            }); // unsubscribes the subscription

            subscription.unsubscribe(function (error, success) {
              if (success) console.log('Successfully unsubscribed!');
            });

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    });
  }
};
$(function () {
  $(window).load(function () {
    App.load();
  });
});