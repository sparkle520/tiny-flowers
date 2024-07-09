const r=`# 事务 (transaction) \r
\r
事务是指是程序中一系列严密的逻辑操作，而且所有操作必须全部成功完成，否则在每个操作中所作的所有更改都会被撤消.即要么都完成，要么都失败.  \r
\r
# 事务的四大特性 (ACID)  \r
\r
## 原子性 (Atomicity)  \r
\r
一个事务 (transaction) 中的所有操作，要么**全部完成**，要么**全部不完成**，不会结束在中间某个环节.事务在执行过程中发生错误，会被**回滚** (Rollback) 到事务开始前的状态，就像这个事务从来没有执行过一样.即，事务不可分割、不可约简.\r
\r
## 一致性 (Consistency)  \r
\r
在事务开始之前和事务结束以后，数据库的完整性没有被破坏.这表示写入的资料必须完全符合所有的预设约束、触发器、级联回滚等.  \r
\r
## 隔离性 (lsolation)  \r
\r
数据库允许多个并发事务同时对其数据进行读写和修改，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的**不一致**.事务隔离分为不同级别，包括 **读未提交** (Read Uncommitted)、**读已提交** (Read Committed)、**可重复读** (Repeatable Read) 和 **串行化** (Serializable).  \r
\r
## 持久性 (Durability)  \r
\r
事务处理结束后，对数据的修改就是**永久**的，即便系统故障也不会丢失.  \r
\r
> 只有保证了事务的 \`持久性\`、\`原子性\`、\`隔离性\` 之后，\`一致性\` 才能得到保障.也就是说 A、I、D 是手段，C 是目的!  \r
\r
# 事务并发引起的问题  \r
\r
## 脏读  \r
\r
一个事务会**读取**到另一个事务**未提交的数据**.  \r
\r
## 不可重复读  \r
\r
在同一事务内，事务两次读取到的**数据**是**不一样**的.\r
\r
## 幻读  \r
\r
事务中的**同一个查询**在不同的时间产生**不同的行集**，这个就是幻读问题.  \r
\r
> [注] \r
> \r
> 1. 不可重复读和幻读，都是读取到其他事务已经**提交**的数据.而脏读是读取到其他事务还**未提交**的数据. \r
> 2. 二者描述的则重点不同，不可重复读描述的侧重点是 \`update\`，而幻读描述的侧重点是 \`insert\` 和 \`delete\`.  \r
\r
## Read Uncommitted (读未提交)  \r
\r
一个事务还**没提交**时，它做的变更就能被别的事务**看到**.\r
\r
## Read Committed (读已提交)  \r
\r
一个事务**提交之后**，它做的变更才会被其他事务**看到**.  \r
\r
## Repeatable Read (可重复读)  \r
\r
一个事务执行过程中看到的数据，总是跟这个事务在**启动时**看到的**数据是一致的**.这是MySQL \`InnoDB\` 引擎的默认隔离级别.\r
\r
## Serializable (串行化)\r
\r
对于同一行记录，“写”会加“**写锁**”，“读”会加“**读锁**”。当出现读写锁冲突的时候，后访问的事务必须等前一个事务执行完成，才能继续执行.  \r
\r
# 事务不同隔离级别导致的脏读、不可重复读和幻读  \r
\r
<table>\r
    <tr>\r
        <td>事务隔离级别</td>\r
        <td> 脏读</td>\r
        <td>不可重复读</td>\r
        <td>幻读</td>\r
    </tr>\r
    <tr>\r
        <td>读未提交 (READ UNCOMMITTED)</td>\r
        <td>√</td>\r
        <td>√</td>\r
        <td>√</td>\r
    </tr>\r
    <tr>\r
        <td>读已提交 (READ COMMITTED)</td>\r
        <td>×</td>\r
        <td>√</td>\r
        <td>√</td>\r
    </tr>\r
    <tr>\r
        <td>可重复读 (REPEATABLE READ)</td>\r
        <td>×</td>\r
        <td>×</td>\r
        <td>√</td>\r
    </tr>\r
    <tr>\r
        <td>串行化 (SERIALIZABLE)</td>\r
        <td>×</td>\r
        <td>×</td>\r
        <td>×</td>\r
    </tr>\r
</table>\r
\r
# spring 中的事务  \r
\r
spring 支持两种事务，一个是**编程式事务管理**，一个是**声明式事务管理**.(两者可混合)  \r
\r
## 编程式事务管理 (不推荐)  \r
\r
侵入性太强，不推荐.不如 AOP 优美、简洁.  \r
\r
## 声明式事务管理 (推荐)  \r
\r
对于声明式事务只需要在方法和类上添加 \`@Transactional\` 注解即可.  \r
\r
[注] \r
 \r
1. 该注解只对 \`public\` 类和方法有效. 加在类上对所有 \`public\` 方法有效. \r
2. 方法前会自动开启事务，如果方法没有抛出异常，执行后会自动提交事务，否则发生回滚.\r
3. 只能回滚非检查型异常，具体为 \`RuntimeException\` 及其子类和 \`Error\` 子类，可以从Spring源码的 \`DefaultTransactionAttribute\` 类里找到判断方法  \`rollbackOn\`.\r
\r
\`\`\` java\r
	@Override\r
	public boolean rollbackOn(Throwable e) {\r
		return (e instanceof RuntimeException || e instanceof Error);\r
	}\r
\`\`\`\r
4. 不能回滚被 \`try{}catch()\` 捕获的异常. \r
\r
解决方案 \r
\r
- 在 \`catch\` 里抛出异常，让 AOP 捕获并回滚. \r
- 在 \`catch\` 里 添加 \`TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();\` 手动回滚.\r
\r
5. 无事务的方法调用有事务的方法会导致方法失效.\r
\r
## @Transactional 属性  \r
\r
### propagation (传播性) \r
\r
枚举类型 \`Propagation\`  默认 \`Propagation.REQUIRED\`.(默认基本够用，顶多 \`REQUIRES_NEW\` 和 \`NESTED\`)\r
\r
#### REQUIRED \r
\r
支持当前事务，如果当前没有事务，则创建一个事务，这是最常见的选择. \r
\r
#### SUPPORTS  \r
\r
支持当前事务，如果当前没有事务，就以非事务来执行.  \r
\r
#### MANDATORY  \r
 \r
支持当前事务，如果没有当前事务，就抛出异常. \r
\r
#### REQUIRES_NEW  \r
\r
开启一个新的事务.如果一个事务已经存在，则先将这个存在的事务挂起.  \r
\r
#### NOT_SUPPORTED  \r
\r
总是非事务地执行，并挂起任何存在的事务.  \r
\r
#### NEVER  \r
\r
总是非事务地执行，不加入任何事务.  \r
\r
#### NESTED  \r
\r
如果一个活动的事务存在，则运行在一个嵌套的事务中.如果没有活动事务, 则按 \`REQUIRED\` 属性执行.  \r
\r
### isolation (隔离性) \r
\r
参照上面 Mysql 的事务隔离.默认为 \`READ_COMMITTED\`.\r
\r
### readOnly (只读性) \r
\r
用在查询 (\`select\`) 上，一条查询执行多次时候用，防止查询出来的数据不一致.  \r
\r
### timeout (超时)  \r
\r
超时自动回滚.单位秒\r
\r
### rollbackFor (回滚异常类) \r
\r
用于指定能够触发事务回滚的异常类型，可以指定多个异常类型.\r
\r
\r
### rollbackForClassName (回滚异常类名) \r
\r
和上面一个意思，只不过是类型变成类名.\r
\r
### noRollbackFor (不回滚异常类)  \r
\r
抛出指定的异常类型，不回滚事务，也可以指定多个异常类型.\r
\r
### noRollbackForClassname (不回滚异常类名) \r
\r
和上面一个意思，只不过是类型变成类名.`;export{r as default};
