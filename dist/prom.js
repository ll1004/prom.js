/*!
 * Prom.js v1.0.1
 * (c) 2019-present Liang (Alley) Luo
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Prom = factory());
})(this, function () {
	function Prom(cb) {
		//0 pending, 1 resolved, 2 rejected
		this.state = 0;
		this.resolve = function (arg) {
			this.arg_resolve = arg
				if (this.state == 0) {
					this.state = 1
				}
				return this
		}
		this.reject = function (arg) {
			this.arg_reject = arg
				if (this.state == 0) {
					this.state = 2
				}
				return this
		}
		this.then = function (cb_then) {
			this.cb_then = cb_then
				if (this.state == 1) {
					if (this.cb_then) {
						this.arg_resolve = this.cb_then(this.arg_resolve)
					}
				}
				return this
		}
		this.catch = function (cb_catch) {
			this.cb_catch = cb_catch
				if (this.state == 2) {
					if (this.cb_catch) {
						this.arg_reject = this.cb_catch(this.arg_reject)
					}
				}
				return this
		}
		function defineReact() {
			var state = this.state;
			Object.defineProperty(this, 'state', {
				enumerable: true,
				configurable: true,
				get: function () {
					return state
				},
				set: function (val) {
					state = val;
					if (val == 1) {
						if (this.cb_then) {
							this.arg_resolve = this.cb_then(this.arg_resolve)
						}
					} else {
						if (this.cb_catch) {
							this.arg_reject = this.cb_catch(this.arg_reject)
						}
					}
				}
			})
		}
		defineReact.call(this);
		cb && cb(this.resolve.bind(this), this.reject.bind(this));
		return this
	}
	Prom.version = "1.0.1";
	Prom.resolve = function (arg) {
		var obj = new this();
		obj.resolve(arg);
		return obj
	}
	Prom.reject = function (arg) {
		var obj = new this();
		obj.reject(arg);
		return obj
	}
	/**
	 * End of all task function after successful execution, or anyone task function fail execution.
	 * Each task must be the Prom object type.
	 */
	Prom.all = function (arg) {
		var obj = {
			state: 0
		};
		var len;
		var finish;
		obj.arg_resolve = [];
		if (arg && arg.length) {
			len = arg.length;
		} else {
			return
		}
		obj.then = function (cb_then) {
			this.cb_then = cb_then
				if (this.state == len) {
					if (this.cb_then) {
						this.arg_resolve = this.cb_then(this.arg_resolve)
					}
				}
				return this
		}
		obj.catch = function (cb_catch) {
			this.cb_catch = cb_catch
				if (this.state < 0) {
					if (this.cb_catch) {
						this.arg_reject = this.cb_catch(this.arg_reject)
					}
				}
				return this
		}
		defineReact.call(obj);
		if (arg && arg.length) {
			arg.forEach(function (item) {
				item.then(function (data) {
					obj.arg_resolve.push(data);
					obj.state++;
				}).catch(function (data) {
					obj.arg_reject = data;
					obj.state = -1;
				})
			})
		}
		function defineReact() {
			var state = this.state;
			Object.defineProperty(this, 'state', {
				enumerable: true,
				configurable: true,
				get: function () {
					return state
				},
				set: function (val) {
					state = val;
					if (!finish) {
						if (val == len) {
							finish = true;
							if (this.cb_then) {
								this.arg_resolve = this.cb_then(this.arg_resolve);
							}
						} else if (val < 0) {
							finish = true;
							if (this.cb_catch) {
								this.arg_reject = this.cb_catch(this.arg_reject);
							}
						}
					}
				}
			})
		}
		return obj
	}
	/**
	 * End of any task function after successful or fail execution.
	 * Each task must be the Prom object type.
	 */
	Prom.race = function (arg) {
		var obj = {
			state: 0
		};
		var finish;
		if (!arg || !arg.length) {
			return
		}
		obj.then = function (cb_then) {
			this.cb_then = cb_then
				if (this.state > 0) {
					if (this.cb_then) {
						this.arg_resolve = this.cb_then(this.arg_resolve)
					}
				}
				return this
		}
		obj.catch = function (cb_catch) {
			this.cb_catch = cb_catch
				if (this.state < 0) {
					if (this.cb_catch) {
						this.arg_reject = this.cb_catch(this.arg_reject)
					}
				}
				return this
		}
		defineReact.call(obj);
		if (arg && arg.length) {
			arg.forEach(function (item) {
				item.then(function (data) {
					obj.arg_resolve = data;
					obj.state++;
				}).catch(function (data) {
					obj.arg_reject = data;
					obj.state--;
				})
			})
		}
		function defineReact() {
			var state = this.state;
			Object.defineProperty(this, 'state', {
				enumerable: true,
				configurable: true,
				get: function () {
					return state
				},
				set: function (val) {
					state = val;
					if (!finish) {
						if (val > 0) {
							finish = true;
							if (this.cb_then) {
								this.arg_resolve = this.cb_then(this.arg_resolve);
							}
						} else if (val < 0) {
							finish = true;
							if (this.cb_catch) {
								this.arg_reject = this.cb_catch(this.arg_reject);
							}
						}
					}

				}
			})
		}
		return obj
	}
	/**
	 * Execute each task in order.
	 * Each task function must be the function itself and not the result of the function execution.
	 */
	Prom.each = function (arg) {
		var obj = {
			state: 0
		};
		var len;
		var finish;
		obj.arg_resolve = [];
		if (arg && arg.length) {
			len = arg.length;
		} else {
			return
		}
		obj.then = function (cb_then) {
			this.cb_then = cb_then
				if (this.state == len) {
					if (this.cb_then) {
						this.arg_resolve = this.cb_then(this.arg_resolve)
					}
				}
				return this
		}
		obj.catch = function (cb_catch) {
			this.cb_catch = cb_catch
				if (this.state < 0) {
					if (this.cb_catch) {
						this.arg_reject = this.cb_catch(this.arg_reject)
					}
				}
				return this
		}
		defineReact.call(obj);

		var listFun = []
		arg.forEach(function (item) {
			function tmp(cb) {
				item().then(function (data) {
					obj.arg_resolve.push(data);
					obj.state++;
					cb && cb();
				}).catch(function (data) {
					obj.arg_reject = data;
					obj.state = -1;
				})
			}
			listFun.push(tmp)
		})
		iterator(0, listFun)
		function iterator(key, list) {
			list[key](function () {
				if (key < list.length - 1) {
					iterator(key + 1, list)
				}
			})
		}
		function defineReact() {
			var state = this.state;
			Object.defineProperty(this, 'state', {
				enumerable: true,
				configurable: true,
				get: function () {
					return state
				},
				set: function (val) {
					state = val;
					if (!finish) {
						if (val == len) {
							finish = true;
							if (this.cb_then) {
								this.arg_resolve = this.cb_then(this.arg_resolve);
							}
						} else if (val < 0) {
							finish = true;
							if (this.cb_catch) {
								this.arg_reject = this.cb_catch(this.arg_reject);
							}
						}
					}

				}
			})
		}
		return obj
	}
	return Prom
});
