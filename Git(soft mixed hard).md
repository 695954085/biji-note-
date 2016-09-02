## Git

根据-soft -mixed -hard,会对working tree和index和HEAD进行重置：

git reset --mixed:此为默认方式，不带任何参数的git reset，即这种方式，它回退到某个版本，只保留源码，回退commit和index信息。

git reset --soft:回退到某个版本，只回退commit的信息，不会恢复index file 一级。如果还要提交直接commit即可。

git reset --hard:彻底会退到某个版本，本地的源码也会变为上一个版本的内容。


----
揭秘

之前我们看到了reset后master文件的内容发生了改变，其实这就是reset命令的文职，但结合不同的参数，会有额外的工作：如： --hard --soft --mixed 


 ![重置命令与版本库关系图](https://github.com/695954085/biji-note-/blob/master/res/git_reset_introduction.png?raw=true)


其实reset命令有两种方法：

	1.git reset [-q][commit][--]<paths>
	2.git reset [--soft|--mixed|--hard|--merge|--keep][-q][<commit>]

第一种用法是不会重置引用的，即不会修改master文件。只是用某一次提交的文件恢复暂存区的文件。

第二种方法不适用&lt;path&gt;则会重置应用，并且参数不同决定是否覆盖暂存区和工作区：

- --hard参数会执行途中1,2,3全部动作，即暂存区，工作区全部用指定提交版本的目录树替换掉。
- --soft参数只执行1，不进行暂存区和工作区的覆盖
- --mixed或不适用参数，执行1,2覆盖暂存区，但不覆盖工作区。



----------
### 工作区（Working Directory）

就是你在电脑里能看到的目录，比如我的<code>learngit</code>文件夹就是一个工作区：

![](https://github.com/695954085/biji-note-/blob/master/res/WorkingDirectory_learngit.png?raw=true)

### 版本库（Repository）

工作区有一个隐藏的目录<code>.git</code>，这个不算工作区，而是git的版本库。

Git的版本库里存了很多东西，其中最重要的就是陈伟stage（或index）的暂存区。还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

![](https://github.com/695954085/biji-note-/blob/master/res/index_learngit.jpg?raw=true)

第一步是用git add 把文件添加进去，实际上就是把文件修改到暂存区；

第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。

> ps:只要做了修改，需要把git add xxx 到暂存区；


----------


## git stash

### git stash save

保留工作区的所有修改，工作区的所有修改恢复到前一个commit。