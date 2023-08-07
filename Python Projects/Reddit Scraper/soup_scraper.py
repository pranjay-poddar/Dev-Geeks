import requests
import datetime
from bs4 import BeautifulSoup
from core.progress_bar import ProgressBar

class SoupScraper():
    
    def __init__(self,
                 reddit_home,
                 slash,
                 subreddit):
        self.reddit_home = reddit_home
        self.slash = slash
        self.subreddit = subreddit.lower()
        
        self.single_post_data = {}
        self.index = 0
        self.pure_html = []
        self.pure_script_data = []
        self.data = []
        
        self.urls = []
        self.url_ids = []
        self.url_titles = []
        self.titles = []
        self.authors = []
        self.upvote_ratios = []
        self.scores = []
        self.post_datetime = []
        self.gold_counts = []
        self.total_num_comments = []
        self.categories = []
        self.texts = []
        self.main_links = []
        self.flairs = []
        self.comment_ids_arr_of_dicts = []
        self.post_links = []
        
        # One array per post, with comment and link in same index
        # [ [post 1], [post 2],... ]
        self.post_data = []
        self.comment_data = []
        self.link_data = []
        self.zipped_data = []
        
        
    def get_scripts(self,
                    urls = []):
        '''
            Finds the script with id of data
        '''
        print('Finding <script id="data"> for each link')
        
        self.urls = urls
        
        pure_html_data = []
        pure_script_data = []
        
        progress = ProgressBar(len(urls))
        for url in urls:
            progress.update()
            headers = {'User-Agent': 'Mozilla/5.0'}
            r = requests.get(url, headers=headers)
            
            soup = BeautifulSoup(r.text, 'html.parser')
            
            pure_html_data.append(r.text)
            pure_script_data.append(soup.find(id='data').text)
            
        self.pure_html = pure_html_data
        self.pure_script_data = pure_script_data
        
        return pure_script_data
        
    
    def get_url_id_and_url_title(self,
                                 single_link,
                                 current_data,
                                 index):
        '''
            Gets id and title from URL
            
                                       /--id--/--------------------URL title--------------------/
            /r/MachineLearning/comments/dkox1s/d_machine_learning_wayr_what_are_you_reading_week/
        '''
        
        self.single_post_data = current_data
        self.index = index
        
        first_index = single_link.index('comments/') + 9
        last_index = first_index + 6
        url_id = single_link[first_index:last_index]
        
        first_index = last_index + 1
        last_index = single_link.rfind('/')
        url_title = single_link[first_index:last_index]
        
        self.url_ids.append(url_id)
        self.url_titles.append(url_title)
    
    def get_title(self):
        '''
            Gets the title of the post
        '''
        
        title = self.single_post_data['posts']\
                                     ['models']\
                                     ['t3_' + self.url_ids[self.index]]\
                                     ['title']
        self.titles.append(title)
        
    def get_upvote_ratio(self):
        '''
            Gets the upvote ratio of the post
        '''
        
        ratio = self.single_post_data['posts']\
                                     ['models']\
                                     ['t3_' + self.url_ids[self.index]]\
                                     ['upvoteRatio']
        
        self.upvote_ratios.append(ratio)
    
    def get_score(self):
        '''
            Gets the score of the post
        '''
        
        score = self.single_post_data['posts']\
                                     ['models']\
                                     ['t3_' + self.url_ids[self.index]]\
                                     ['score']
        self.scores.append(score)
    
    def get_posted_time(self):
        '''
            Gets the posted time in milliseconds from unix time and converts
            to datetime
        '''
        time = self.single_post_data['posts']\
                                    ['models']\
                                    ['t3_' + self.url_ids[self.index]]\
                                    ['created']
        time = datetime.datetime.fromtimestamp(time//1000.0)
        self.post_datetime.append(time)
    
    def get_flairs(self):
        '''
            Get the flair of the post
        '''
        
        flairs = self.single_post_data['posts']\
                                      ['models']\
                                      ['t3_' + self.url_ids[self.index]]\
                                      ['flair']
        
        flair_arr = []
        if flairs is not None:
            for flair in flairs:
                flair_arr.append(flair['text'])
        
        self.flairs.append(flair_arr)
    
    def get_num_gold(self):
        '''
            Get the number of golds for post
        '''
        
        gold = self.single_post_data['posts']\
                                    ['models']\
                                    ['t3_' + self.url_ids[self.index]]\
                                    ['goldCount']
                                    
        self.gold_counts.append(gold)
    
    def get_author(self):
        '''
            Get the author of the post
        '''
        
        author = self.single_post_data['posts']\
                                      ['models']\
                                      ['t3_' + self.url_ids[self.index]]\
                                      ['author']
                                      
        self.authors.append(author)
    
    def get_category(self):
        '''
            Gets the category of the subreddit
        '''
        categories = self.single_post_data['posts']\
                                          ['models']\
                                          ['t3_' + self.url_ids[self.index]]\
                                          ['postCategories']
        
        cat_arr = []
        if categories is not None:
            for cat in categories:
                cat_arr.append(cat['categoryName'])
        
        self.categories.append(cat_arr)
    
    def get_total_num_comments(self):
        '''
            Gets the total number of comments on a post
        '''
        total_num_comments = self.single_post_data['posts']\
                                                  ['models']\
                                                  ['t3_' + self.url_ids[self.index]]\
                                                  ['numComments']
                                                 
        self.total_num_comments.append(total_num_comments)
    
    def get_main_link(self):
        '''
            If the post links to a third party URL, it will be in the post
            instead of text/discussion of some topic.
            
            Returns main link to other URL.
        '''
        main_link = self.single_post_data['posts']\
                                         ['models']\
                                         ['t3_' + self.url_ids[self.index]]\
                                         ['source']
        if main_link is not None:
            main_link = main_link['url']
            
        self.main_links.append(main_link)
        
    
    def get_links_from_post(self):
        '''
            Gets all links from a post
        '''
        
        all_links_from_post = []
        
        curr_html = self.pure_html[self.index]
        soup = BeautifulSoup(curr_html, 'html.parser')
        div = soup.find('div', attrs={'data-click-id' : 'text'})
        
        if(div is not None):
            for a in div.find_all('a'):
                all_links_from_post.append(a['href'])
        else:
             all_links_from_post.append('')
        
        self.post_links.append(all_links_from_post)
        
    def get_text(self):
        '''
            Posts have text in them, which this method scrapes
        '''
        
        curr_html = self.pure_html[self.index]
        soup = BeautifulSoup(curr_html, 'html.parser')
        div = soup.find('div', attrs={'data-click-id' : 'text'})
        
        if(div is not None):
            self.texts.append(div.getText())
        else:
            self.texts.append('')
        
        
    def get_comment_ids(self):
        '''
            Gets all comment ids for each post.
                                                                                                        /comment id
            https://www.reddit.com/r/MachineLearning/comments/dtfx9m/rtheoretical_research_paper_in_gans/f6wbrvh
        '''
        
        comment_ids_dict = self.single_post_data['commentsPage']\
                                           ['keyToCommentThreadLinkSets']\
                                           ["commentsPage--[post:'t3_" + self.url_ids[self.index] + "']"]
        
        self.comment_ids_arr_of_dicts.append(comment_ids_dict)
        
    def _extract_comment_ids_to_sql_format(self,
                                           curr_url,
                                           comment_ids_arr_of_dicts):
        '''
            Extracts individual comment ids, next comments and previous comments
        '''
        
        array_of_comments = []
        array_of_comment_ids = []
        array_of_depth = []
        array_of_next = []
        array_of_prev = []
        
        def extract_comment_id(comment_id):
            if comment_id is None:
                return comment_id
            
            if '_' in comment_id:
                return comment_id.split('_')[1]
            else:
                return comment_id
        
        for key, value in comment_ids_arr_of_dicts.items():
            depth = value['depth']
            next_comment = value['next']
            prev_comment = value['prev']
            
            if next_comment is not None:
                next_comment = extract_comment_id(next_comment['id'])
            if prev_comment is not None:
                prev_comment = extract_comment_id(prev_comment['id'])
            
            comment_id = extract_comment_id(key)
            comment_url = curr_url + comment_id
            
            array_of_comments.append(comment_url)
            array_of_comment_ids.append(comment_id)
            array_of_depth.append(depth)
            array_of_next.append(next_comment)
            array_of_prev.append(prev_comment)
            
        return array_of_comments, array_of_comment_ids, array_of_depth, array_of_next, array_of_prev
    
    def _scrape_and_generate_comments_for_insertion(self,
                                                    comment_id_links_array,
                                                    array_of_comment_ids,
                                                    array_of_depth,
                                                    array_of_next,
                                                    array_of_prev):
        '''
            Scrapes every comment with the comment_id_links_array, and finally
            returns a useable array for insertion.
        '''
        array_of_comment_data = []
        
        headers = {'User-Agent': 'Mozilla/5.0'}
        for i, comment_url in enumerate(comment_id_links_array):
            author = None
            text = None
            score = None
            comment_id = array_of_comment_ids[i]
            
            # Open the url, find the div with classes Comment.t1_comment_id
            r = requests.get(comment_url, headers=headers)
            soup = BeautifulSoup(r.text, 'html.parser')
            div = soup.select('div.Comment.t1_{0}'.format(comment_id))
            
            # If it found the div, let's extract the text from the comment
            if div is not None and len(div) > 0 :
                author = div[0].find_all('a')[0].get_text()
                spans = div[0].find_all("span")
                score = [spans[i].get_text() for i in range(len(spans)) if 'point' in spans[i].get_text()]
                
                html_and_text = div[0].find('div', attrs={'data-test-id' : 'comment'})
                if html_and_text is not None:
                    text = html_and_text.get_text()
                
                if len(score) == 0:
                    score = None
                else:
                    score = score[0]
            
            # Make useable array for insertion
            array_of_comment_data.append([None,
                                          None,
                                          str(comment_id),
                                          str(score),
                                          array_of_depth[i],
                                          str(array_of_next[i]),
                                          str(array_of_prev[i]),
                                          str(author),
                                          str(text)])
            
        return array_of_comment_data
    
    def _extract_post_links_to_sql_format(self,
                                          links):
        array_of_links = []
        if(links != None and links != []):
            for link in links:
                link_arr = [None, 
                            None, 
                            link]
                array_of_links.append(link_arr)
                
        return array_of_links
        
    def prepare_data_for_sql(self,
                             scrape_comments):
        '''
            We define three arrays of data, one array for each table in the
            created SQL database.
        '''
        
        post_data = []
        comment_data = []
        link_data = []
        
        message = 'Gathering all the scraped data'
        if scrape_comments:
            message += ', and scraping ALL comment data (very slow, dependent on number of comments)'
        
        print(message)
        
        progress = ProgressBar(len(self.urls))
        for i in range(len(self.urls)):
            progress.update()
            
            # append data to post_data
            flairs = ''.join([flair + ',' for flair in self.flairs[i]])
            categories = ''.join([cat + ',' for cat in self.categories[i]])
            
            post = [None,                       # id
                    self.urls[i],               # url
                    self.url_ids[i],            # url_id
                    self.url_titles[i],         # url_title
                    self.authors[i],            # author
                    self.upvote_ratios[i],      # upvote_ratio
                    self.scores[i],             # score
                    self.post_datetime[i],      # time_created
                    self.gold_counts[i],        # num_gold
                    self.total_num_comments[i], # num_comments
                    categories,                 # category
                    self.texts[i],              # text
                    self.main_links[i],         # main_link
                    flairs                      # flair
                    ]
            
            if scrape_comments:
                # append data to comment_data
                comment_id_links_array, \
                array_of_comment_ids, \
                array_of_depth, \
                array_of_next, \
                array_of_prev= self._extract_comment_ids_to_sql_format(self.urls[i],
                                                                       self.comment_ids_arr_of_dicts[i])
                
                comments = self._scrape_and_generate_comments_for_insertion(comment_id_links_array,
                                                                           array_of_comment_ids,
                                                                           array_of_depth,
                                                                           array_of_next,
                                                                           array_of_prev)
                comment_data.append(comments)
            
            links = self._extract_post_links_to_sql_format(self.post_links[i])
            
            post_data.append(post)
            link_data.append(links)
            
            
        self.post_data = post_data
        self.link_data = link_data
        
        if scrape_comments:
            self.comment_data = comment_data
        
