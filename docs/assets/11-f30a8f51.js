const n=`# Mysql 索引  \r
\r
索引 (Index) 是帮助 MySQ L高效获取数据的数据结构.因此索引的本质就是数据结构.索引的目的在于提高查询效率，可类比字典、书籍的目录等这种形式.  \r
\r
# 索引的优缺点 \r
\r
## 优点  \r
\r
1. 提升数据的检索效率，减低数据库的 IO 成本. \r
\r
2. 通过索引列对数据进行排序，降低数据的排序成本，从而降低CPU的消耗.\r
\r
## 缺点  \r
\r
1. 索引实际上也是一张表，该表保存了主键与索引字段，并指向实体表的记录，所以索引列也要占用空间. \r
\r
2. 虽然索引大大提高了查询效率，但是降低了更新表的速度，如 \`insert\`、\`update\` 和 \`delete\` 操作.因为更新表时，MySQL 不仅要保存数据，还要保存索引文件每次更新的索引列字段，并且在更新操作后，会更新相应字段索引的信息.  \r
\r
3. 索引只是提高查询效率的一个因素，如果你的MySQL有大量的数据表，就需要花时间研究建立最优秀的索引或优化查询语句.  \r
\r
# 索引分类  \r
\r
索引主要分为三个类  \r
\r
## 单值索引  \r
\r
一个索引只包含单个列，一个表可以有多个单值索引.  \r
\r
## 唯一索引  \r
\r
索引列的值必须唯一，但允许有空值，主键就是唯一索引.  \r
\r
## 复合索引  \r
\r
一个索引包含多个列. \r
\r
// Todo 待完成\r
\r
`;export{n as default};