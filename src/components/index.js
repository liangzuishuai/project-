const query = Bmob.Query('vipuser');

// 获取 用户信息
export let getMemberInfo = () =>{
    return query.find()
}

// 修改用户信息
export let resetMemberInfo = (objectId,key,value) =>{
    query.get(objectId).then(res => {
        console.log(res)
        res.set(key,value)
        res.save()
    }).catch(err => {
        console.log(err)
    })
}

// 删除 用户信息
export let deleteMemberInfo = (objectId) =>{
    query.destroy(objectId).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

// 增加 用户信息
export let addMemberInfo = (name,number,score) =>{
    query.set("name",name);
    query.set("number",number);
    query.set("score",score);
    query.save().then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}