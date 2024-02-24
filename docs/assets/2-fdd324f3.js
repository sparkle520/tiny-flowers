const n=`# 最长回文子序列\r
> 给你一个字符串\`s\`，找出其中最长的回文子序列，并返回该序列的长度。 <br>\r
> 子序列定义为：不改变剩余字符顺序的情况下删除某些字符或者不删除任何字符形成的一个序列。\r
\r
## 动态规划\r
\r
\r
\`\`\`c++\r
 int longestPalindromeSubseq(string s) {\r
        int l = static_cast<int>(s.size());\r
        vector<vector<int>> dp(l, vector<int>(l, 0));\r
        for (int i = 0; i < l; i++) {\r
            dp[i][i] = 1;\r
        }\r
        for (int i = l - 1; i >= 0; i--) {\r
            for (int j = i + 1; j < l; ++j) {\r
                if (s[i] == s[j]) {\r
                    dp[i][j] = dp[i + 1][j - 1] + 2;\r
                    cout << dp[i][j];\r
                } else {\r
                    dp[i][j] = std::max(dp[i + 1][j], dp[i][j - 1]);\r
                    cout << dp[i][j];\r
                }\r
            }\r
        }\r
        return dp[0][l - 1];\r
    }\r
\`\`\``;export{n as default};
