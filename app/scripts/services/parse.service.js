
'use strict';
/** @ngInject */
angular
    .module('parseServies', [
  	])
	.service('parseServies', function Database($rootScope, $q, $http) 
	{	
		var dataType = ['string', 'pointer', 'time', 'bolean', 'number'];
		var parseParams = {include: "_include", limit: "_limit", skip: "_skip", where: "_where", select: "_select", order: "_order"};
		var pointerMapping = {};
		// TODO reading all credentials from external files and make all functions wait
		// untill it finishes reading
		// Initialize database
		Database.prototype.init = function()
		{
			// var defer = $q.defer();
			Parse.initialize("Plbvy8xPvouq0pI393QyANx9TWXkh4gqk5nRVlod", "9lpB4VEEFy9Gb9bBnbSlRDxdnwIqoOXGjKfViFW0");
			Parse.User.enableRevocableSession();
			var dataStruct = {
			    "_User": {
			        "group": {
			          "_type": "pointer",
			          "to": "group"
			        },
			      },

			    "Tasks": {
			        "createdBy": {
			          "_type": "pointer",
			          "to": "_User"
			        },
			    },

			    "TaskStatus": {
			        "task": {
			          "_type": "pointer",
			          "to": "Tasks"
			        },
			    }

			}; 
			Database.prototype.setPointerMapping(dataStruct);
			// var defer = $q.defer();
			// Database.prototype.setKeys().then(function(data){
			// 	if (data.error !== undefined) {
			// 		console.error(data.error.message);
			// 	};
			// 	
			// })
			// Database.prototype.modelDatabase().then(function(data){
			// 	if (data.error !== undefined) {
			// 		console.error(data.error.message);
			// 	};

			// 	defer.resolve({results:{message: 'Successfully initialized', code: 202}});
			// })
			// return defer.promise;
		}

		Database.prototype.setPointerMapping = function(tables) {
			for (var table in tables) {
				for (var column in tables[table]) {
					if (dataType.indexOf(tables[table][column]) === -1 && dataType.indexOf(tables[table][column]['_type']) ===-1)
					{
						return {error:{message: 'Invalid data type'}};
					} else if (tables[table][column]['_type'] == 'pointer')
					{
						pointerMapping[column] = tables[table][column]['to'];
					}
				};
			};
		}

		// Modeling database and validate field
		Database.prototype.modelDatabase = function() {
			var defer = $q.defer();
			Database.prototype.readDatabaseStruct().then(function(data){
				Database.prototype.setPointerMapping(data[1])
				Parse.initialize(data.applicationId, data.javascriptKey);
				defer.resolve({results:{message: 'Database contructed successfully', code: 202}});
			});
			return defer.promise;
		}

		// Read in database structure from dataStruct.json
		Database.prototype.readDatabaseStruct = function() {
	        var defer = $q.defer();
	        $http.get('dataStruct.json')
	            .success(function(data) {
	                defer.resolve(data);
	            })
	            .error(function() {
	                defer.reject('Could not find dataStruct.json');
	            });

	        return defer.promise;
	    }

	    // Read in keys from keys.json
		Database.prototype.readParseKeys = function() {
	        var defer = $q.defer();
	        $http.get('keys.json')
	            .success(function(data) {
	                defer.resolve(data);
	            })
	            .error(function() {
	                defer.reject('Could not find keys.json');
	            });

	        return defer.promise;
	    }

		// set Parse keys
		Database.prototype.setKeys = function(applicationId, javascriptKey){
			var defer = $q.defer();
			Database.prototype.readParseKeys().then(function(data){
				if (data['applicationId'] === undefined || data['javascriptKey'] === undefined) {
					defer.resolve({error:{message: 'One or both keys for Parse are missing', code: 422}});
				} else {
					Parse.initialize(data.applicationId, data.javascriptKey);
					defer.resolve({results:{message: 'Successfully initialized', code: 202}});
				}
			})
			return defer.promise;
		};

		// set Parse keys simple
		Database.prototype.setKeysSimple = function(applicationId, javascriptKey){
			Parse.initialize(data.applicationId, data.javascriptKey);
		}

		// Mapping Pointer
		Database.prototype.setPointerMappingSimple = function(setting){
			pointerMapping = setting;
		};

		// Encode parse pointer from objectId to {__type: "Pointer", className: table, objectId: objectId}
		Database.prototype.encodeQuery = function(query){
			var keys = Object.keys(query);
			for (var i = 0; i < keys.length; i++) 
			{
				if (pointerMapping[keys[i]]) {
					query[keys[i]] = {
						  __type: "Pointer",
				        className: pointerMapping[keys[i]],
				        objectId: query[keys[i]]
				    }
				}else if (typeof(query[keys[i]]) === 'object') {
					Database.prototype.encodeQuery(query[keys[i]]);
				}
			}
			return query;
		};

		// Decode parse pointer from object type to a string of objectId only
		Database.prototype.decodeData = function(query){
			var keys = {};
			if (typeof(query) === 'object' && query !== null) {
				keys = Object.keys(query);
			}
			for (var i = 0; i < keys.length; i++) 
			{
				if (pointerMapping[keys[i]]) {
					query[keys[i]] = query[keys[i]].objectId;
				} else if (typeof(query[keys[i]]) === 'object') {
					if ( query[keys[i]]._url)
					{
						query[keys[i]] = {
							url : query[keys[i]]._url,
							name : query[keys[i]]._name
						}
					} else {
						Database.prototype.decodeData(query[keys[i]]);
					}
				}
			}
			return query;
		};

		// TODO: these two functions are not well written
		// Strip down array of results to remove unnecessary data
		Database.prototype.stripArray = function(data){
			var objects = [];
			var keys = [];
			for (var x = 0; x < data.length; x++) {
				var object = {};
				keys[x] = Object.keys(data[x].attributes);
				object.objectId = data[x].id;
				for (var y = 0; y < keys[x].length; y++) {
					if (data[x].attributes[keys[x][y]] && data[x].attributes[keys[x][y]].attributes) {
						object[keys[x][y]] = Database.prototype.stripObject(data[x].attributes[keys[x][y]]);
					} else {
						object[keys[x][y]] = data[x].attributes[keys[x][y]];
					}
				}
				objects.push(object);
			}
			return objects;
		};

		Database.prototype.stripObject = function(data){
			var object = {};
			var keys = Object.keys(data.attributes);
			object.objectId = data.id;
			for (var i = 0; i < keys.length; i++) {
				object[keys[i]] = data.attributes[keys[i]];
				if (data.attributes[keys[i]] && data.attributes[keys[i]].attributes) {
					object[keys[i]] = Database.prototype.stripObject(data.attributes[keys[i]]);
				} else {
					object[keys[i]] = data.attributes[keys[i]];
				}
			}
			return object;
		};

		// Users
		Database.prototype.signup = function(data){
			var defer = $q.defer();
			var user = new Parse.User();
			user.set("username", data.username);
			user.set("password", data.password);
			user.set("email", data.email);
			user.signUp(null, {
				success: function(data) {
				var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripObject(data)), code: 200});
					
				},
				error: function(data, error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					
				}
			});
			return defer.promise;
		};

		Database.prototype.login = function(data){
			if (Parse.User.current()) {
				Parse.User.logOut();
			};
			var defer = $q.defer();
			Parse.User.logIn(data.username, data.password, {
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripObject(data)), code: 200});
					
				},
				error: function(data, error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					
				}
			});
			return defer.promise;
		};

		Database.prototype.getCurrentUser = function()
		{
			return Parse.User.current();
		}

		Database.prototype.logout = function(){
			Parse.User.logOut();
		};

		Database.prototype.updateUser = function(data){
			var currentUser = Parse.User.current();
			if (currentUser) {
				username = currentUser.attributes.username
			} else {
				var username = data.username
			}
			var defer = $q.defer();
			Parse.User.logIn(data.username, data.oldPassword, {
				success: function(data) {
					currentUser = Parse.User.current();
					currentUser.set("password", data.password);
					currentUser.set("email", data.email);
					currentUser.save(null, {
						success: function(currentUser) {
							defer.resolve({results: currentUser, code: 200});
							
						},
						error: function(currentUser, error) {
							handleParseError(error.code);
							defer.resolve({results:{error: error.message, code: error.code}});
							
						}
					});
				},
				error: function(data, error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					
				}
			});
			return defer.promise;
		};

		// REST

		Database.prototype.post = function(table_name, data){
			var table = new (Parse.Object.extend(table_name))();
			var defer = $q.defer();
			Database.prototype.encodeQuery(data);
			table.save(data, {
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripObject(data)), code: 200});
					
				},
				error: function(error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					
				}
			});
			return defer.promise;
		    
		};

		Database.prototype.get = function(table_name, params){
			Database.prototype.encodeQuery(params);
			var query = new Parse.Query(Parse.Object.extend(table_name));
			var defer = $q.defer();
			var keys = Object.keys(params);
			for (var i = 0; i < keys.length; i++) {
				if (parseParams[keys[i]]) {
					query[parseParams[keys[i]]] = params[keys[i]];
				}
			}
			query.find({
				success: function(data) {
					var results = new Database();
					results.setPointerMapping(pointerMapping);
					defer.resolve({results: results.decodeData(results.stripArray(data)), code: 200});
					// 
				},
				error: function(error) {
					handleParseError(error.code);
					defer.resolve({results:{error: error.message, code: error.code}});
					// 
				}
			});
			return defer.promise;
		};

		Database.prototype.put = function(table_name, objectId, data)
		{
			var defer = $q.defer();
			var query = new Parse.Query(Parse.Object.extend(table_name));
			Database.prototype.encodeQuery(data);
			query.equalTo("objectId", objectId);
			query.first({
			  success: function(object) {
			  	var keys = Object.keys(data);
			  	if (object) {
			  		for (var i = 0; i < keys.length; i++) {
			  			object.set(keys[i], data[keys[i]]);
				  	}
				    var result = object.save();
				    result.then(function(){
				    	var results = new Database();
						results.setPointerMapping(pointerMapping);
				    	if (result._resolved) {
					    	defer.resolve({results: results.decodeData(results.stripArray(result._result)), code: 200});
					    	
					    } else
					    {
					    	defer.resolve({results:{error: "Failed to update", code: 400}});
					    	
					    }
				    });
			  	} else {
			  		defer.resolve({results:{error: "Database.prototype object does not exist", code: 404}});
			  		
			  	}
			  	
			  },
			  error: function(error) {
			  	handleParseError(error.code);
			    defer.resolve({results:{error: error.message, code: error.code}});
			  	
			  }
			});
			return defer.promise;
		};

		Database.prototype.delete = function(table_name, objectId)
		{
			var defer = $q.defer();
			var query = new Parse.Query(Parse.Object.extend(table_name));
			query.equalTo("objectId", objectId);
			query.first({
			  success: function(object) {
			  	if (object) {
				  	object.destroy({
						  success: function(data) {
						  	defer.resolve({results:{error: "Object " + data.id + " has been deleted"}, code: 200});
						  	
						  },
						  error: function(data, error) {
						  	handleParseError(error.code);
						    defer.resolve({results:{error: error.message, code: error.code}});
						  	
						  }
						});
					} else {
						defer.resolve({results:{error: "Object does not exist", code: 404}});
						
					}	
			  },
			  error: function(error) {
			    defer.resolve({results:{error: error.message, code: error.code}});
			  	
			  }
			});
			return defer.promise;
		};

		Database.prototype.uploadFile = function(file){
			var parseFile = new Parse.File(file[0].name, file[0]);
			var defer = $q.defer();
			parseFile.save().then(function() {
				defer.resolve({results: parseFile, code: 200});
		    }, function(error) {
		    	defer.resolve({results:{error: error.reponseText, code: error.status}});
		    });
			return defer.promise;
		    
		};

		function handleParseError(err) {
			switch (err.code) {
				case Parse.Error.INVALID_SESSION_TOKEN:
					Parse.User.logOut();
					break;
			}
		}

		// function checkFlag(param) {
		//     if($rootScope.is_initialized == false) {
		//         window.setTimeout(checkFlag, 1); /* Database.prototype checks the flag every 100 milliseconds*/
		//     } else {
		//     	console.log("hello")
		//     }
		// }


		// Database.prototype.request = function(method, table_name, data, objectId)
		// {
		// 	if ($rootScope.is_initialized == false) {
		// 		Database.prototype.init
		// 	};
		// }
	});

	