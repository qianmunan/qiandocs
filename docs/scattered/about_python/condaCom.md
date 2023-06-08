## conda 命令

以下是一些常用的 `conda` 命令：

1. 创建虚拟环境

```bash
conda create --name <env_name> [package_name]
```

2. 激活虚拟环境

```bash
conda activate <env_name>
```

3. 在虚拟环境中安装包

```bash
conda install <package_name>
```

4. 查看已安装的包

```bash
conda list
```

5. 更新包

```bash
conda update <package_name>
```

6. 删除包

```bash
conda remove <package_name>
```

7. 导出和导入环境

```bash
# 导出环境到文件environment.yml
conda env export > environment.yml

# 从文件environment.yml创建环境
conda env create -f environment.yml
```

8. 列出所有可用环境

```bash
conda env list
```

以上是一些基本的 `conda` 命令，如果你需要更详细的帮助，请参考 `conda` 的官方文档。





在 Anaconda 中，可以使用 `conda` 命令来创建一个虚拟环境，并指定 Python 版本。下面是一些示例命令：

1. 查看安装的 Python 版本

   ```
   conda search python
   ```

2. 创建一个名为 my_env 的虚拟环境，并指定 Python 版本为 3.7

   ```
   conda create --name my_env python=3.7
   ```

3. 激活虚拟环境

   ```
   conda activate my_env
   ```

4. 在虚拟环境下安装其他要用到的包

   ```
   conda install numpy pandas matplotlib
   ```

5. 退出虚拟环境

   ```
   conda deactivate
   ```

需要注意的是，虚拟环境的名称可以自己设定，Python 版本也可以根据需要指定。这里只是提供了一个示例命令。创建虚拟环境时应该先核对已经安装的 Python 版本，再进行相应设置，避免出现不必要的错误。



## pip 换源

```shell

pip install jupyter_nbextensions_configurator -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install jupyter_contrib_nbextensions

jupyter contrib nbextension install --user

pip install jupyter_nbextensions_configurator

jupyter nbextensions_configurator enable --user


```

https://algorithm-visualizer.org/



## jupyter notebook

Jupyter Notebook 是一个非常强大的交互式开发工具，可以通过使用快捷键来提高效率。以下是 Jupyter Notebook 中一些常用的快捷键：

1. `Enter`: 进入编辑模式
2. `Esc`: 进入命令模式
3. `Ctrl + Enter`: 运行当前单元格
4. `Shift + Enter`: 运行当前单元格并将焦点移到下一个单元格
5. `Alt + Enter`: 运行当前单元格并在下方新建一个单元格
6. `Y`: 将当前单元格切换为 Code 模式
7. `M`: 将当前单元格切换为 Markdown 模式
8. `A`: 在当前单元格上方插入一个新单元格
9. `B`: 在当前单元格下方插入一个新单元格
10. `D,D`: 删除当前单元格
11. `Z`: 恢复删除的最后一个单元格
12. `X`: 剪切当前单元格
13. `C`: 复制当前单元格
14. `V`: 粘贴剪切板内容到当前单元格
15. `Shift + M`: 合并选中的多个单元格
16. `Shift + Up(或Down)`: 选中当前单元格及上方（或下方）的所有单元格

这里列举了 Jupyter Notebook 的部分快捷键，还有很多其他功能可以通过快捷键来实现。同时，Jupyter Notebook 也支持自定义快捷键。如果想要查看所有的快捷键，可以在 Jupyter Notebook 中使用 `H` 键打开快捷键帮助文档。