
function badDB(indexes, final_unique_strict){
  var options = {
      FINAL: 1,
      UNIQUE: 2,
      STRICT: 4
  };
  this.keys = {};
  for(var i in options){
    if(options[i] & final_unique_array)
      this[i] = true;
  }
  for(var i in indexes){
    this.keys[indexes[i]] = {};
  }

  this.curv;

}

badDB.prototype.add = function(){
  var args = Array.prototype.slice.call(ob,0);
  var ob;
  if(args.length == 0)
    throw new Error("Cannot add what doesn't exist");
  while(args.length > 0){
    ob = args.shift()
    for(var key in this.keys){
      if(!(key in ob)){
        if(this.STRICT)
          throw new Error("Cannot add an object without all the indexes: "+key);
        continue
      }
      if(!/number|string/.test(typeof ob[key]))
        throw new Error("need a number or string value for: "+key);
      if(this.FINAL && this.keys[key][ob[key]])
        throw new Error("Cannot add a new value for a final key");
      else if(this.UNIQUE || !this.keys[key][ob[key]])
        this.keys[key][ob[key]] = [ob];
      else
        this.keys[key][ob[key]].push(ob);
      this.applyGS(ob,key,ob[key]);
    }
  }
  return this;
}

badDB.prototype.applyGS = function(ob,key,value){
  var that = this;
  (function(key,value,ob){
    Object.defineProperty(ob,key{
      enumerable:true,
      get:function(){
        return value;
      },
      set:function(y){
        var n = this.keys[key][value].indexOf(ob)]
        if(!/number|string/.test(typeof y))
          throw new Error("need a number or string value for: "+key);
        if(this.FINAL && this.keys[key][y])
          throw new Error("Cannot add a new value for a final key");
        else if(this.UNIQUE || !this.keys[key][ob[key]])
          this.keys[key][y] = [ob];
        else
          this.keys[key][y]].push(ob);
        delete this.keys[key][value][n];
        if(this.keys[key][value].length == 0)
          delete this.keys[key][value]
        value = y;
      }.bind(this);
    });

  })(key,value,ob);
}

badDB.prototype.remove = function(){
  var args = Array.prototype.slice.call(arguments,0);
  var ob;
  if(args.length == 0)
    args = this.curv;
  if(args.length == 0)
    throw new Error("Cannot remove what doesn't exist, removeAll for emptying");
  while(args.length > 0){
    ob = args.shift()
    if(in == -1) throw new Error("this object doesn't exist");
    for(var key in this.keys){
      if(!(key in ob))
        continue;
      if(!/number|string/.test(typeof ob[key]))
        throw new Error("need a number or string value for: "+key);
      delete this.keys[key][ob[key]][this.keys[key][ob[key]].indexOf(ob)];
    }
    delete this.curv[this.curv.indexOf(ob)];
  }
}

badDB.prototype.okv_Search = function(kv){
  var me = false;
  if(!this.append){
    this.curv = [];
    this.append = true
    me = true;
  }
  this.curv = [];
  for(var i in kv)
    this.skuv_Search(i,kv[i]);
  if(me){
    this.append = false
  }
}

badDB.prototype.magic = function(fn){
  var args = Array.prototype.slice.call(arguments,0);
  fn = args.shift();
  for(var i in this.curv){
    if(this.curv[i][fn])
      this.curv[i][fn].apply(this.curv[i],args);
  }
}

badDB.prototype.ukuv_Search = function(key,value){
  var me = false;
  if(!this.append){
    this.curv = [];
    this.append = true
    me = true;
  }
  if(!this.append){
    this.curv = [];
    this.append = true
  }
  var doe = [];
  if(/string|number/.test(typeof key)){
    doe = [key];
  }else if(key instanceof RegExp){
    for(var i in this.keys){
      if(key.test(i))
        doe.push(i)
    }
  }else if(Array.isArray(key)){
    while(key.length > 0){
      this.ukuv_Search(key.shift(),value);
    }
  }else
    throw new Error("key can only be Regula Express, String or Number");
  while(doe.length > 0){
    this.skuv_Search(doe.shift(), value);
  }
  if(me){
    this.append = false
  }
}

badDB.prototype.set = function(key,value){
  for(var i in this.curv){
    this.curv[i][key] = value;
  }
}

badDB.prototype.get = function(key){
  if(!key) return this.curv;

  return this.curv[i][key];
}

badDB.prototype.removeAll = function(){
  this.keys = {};
  this.curv = [];
}

badDB.prototype.skuv_Search = function(key,value){
  var me = false;
  if(!this.append){
    this.curv = [];
    this.append = true
    me = true;
  }
  if(/string|number/.test(typeof value)){
    if(this.curv.indexOf(this.keys[key][value]) == -1)
      this.curv.concat(this.keys[key][value]);
  }else if(value instanceof RegExp){
    for(var v in this.keys[key])
      if(value.test(v.toString()))
        this.skuv_Search(key,v);
  }else if(Array.isArray(value)){
    while(value.length > 0)
      this.skuv_Search(key,value.shift());
  }else
    throw new Error("Can only search by Regular expression, string or number")
  if(me){
    this.append = false
  }
}

